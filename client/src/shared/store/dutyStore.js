import { create } from "zustand";
import { collection, getDocs, deleteDoc, addDoc } from "firebase/firestore";
import { db } from "../../../firebase"; // Убедитесь, что путь правильный
import * as XLSX from "xlsx";

const useDutyStore = create((set, get) => ({
  duties: [],
  isLoading: false,
  error: null,

  convertToISODate: (dateValue) => {
    if (typeof dateValue === "number") {
      const excelEpoch = new Date(1899, 11, 30);
      const date = new Date(
        excelEpoch.getTime() + dateValue * 24 * 60 * 60 * 1000
      );
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    return null;
  },

  fetchDuties: async () => {
    set({ isLoading: true, error: null });

    try {
      // Проверяем наличие интернета
      if (!navigator.onLine) {
        throw new Error("No internet connection, falling back to cache");
      }

      if (!db) {
        throw new Error("Firestore db is not initialized");
      }

      const dutiesCollection = collection(db, "duties");
      const snapshot = await getDocs(dutiesCollection);
      let dutiesData = [];

      if (!snapshot.empty) {
        dutiesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } else {
        console.log("Firestore collection is empty");
      }

      // Сохраняем в localStorage только если получили данные
      if (dutiesData.length > 0) {
        const cache = {
          data: dutiesData,
          timestamp: Date.now(),
        };
        localStorage.setItem("dutiesData", JSON.stringify(cache));
        console.log("Data fetched from Firestore and cached");
      }

      set({ duties: dutiesData, isLoading: false });
      return get().duties
    } catch (error) {
      console.error("Error fetching duties from Firestore:", error);

      // Используем кэш из localStorage
      const cached = localStorage.getItem("dutiesData");
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        const ageInSeconds = (Date.now() - timestamp) / 1000;

        if (ageInSeconds > 7 * 24 * 60 * 60) {
          console.warn("Cached duties data is older than 7 days");
        }

        console.log("Using cached duties data from localStorage:");
        set({ duties: data, isLoading: false });
        return;
      }

      // Если кэша нет, устанавливаем ошибку
      set({
        error:
          error.message || "Не удалось загрузить данные из Firestore или кэша",
        isLoading: false,
      });
    }
  },

  getDutiesByOrganization: (organization) => {
    const duties = get().duties;
    if (!Array.isArray(duties)) return [];
    return organization
      ? duties.filter((duty) => duty.organization === organization)
      : [];
  },

  getDutiesByDate: (date) => {
    const duties = get().duties;
    if (!Array.isArray(duties)) return [];
    return date ? duties.filter((duty) => duty.date === date) : [];
  },

  getDuties: (organization, date) => {
    let filteredDuties = get().duties;
    if (!Array.isArray(filteredDuties)) return [];
    if (organization) {
      filteredDuties = filteredDuties.filter(
        (duty) => duty.organization === organization
      );
    }
    if (date) {
      filteredDuties = filteredDuties.filter((duty) => duty.date === date);
    }
    return filteredDuties;
  },

  addNewDuties: async (file) => {
    set({ isLoading: true, error: null });

    try {
      if (!navigator.onLine) {
        throw new Error("Оффлайн-режим: нет соединения с интернетом");
      }

      // Проверка формата файла
      if (!file.name.endsWith(".xlsx")) {
        throw new Error("File must be an Excel (.xlsx)");
      }

      // Чтение файла
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Обработка данных
      const duties = data.slice(1).map((row) => ({
        organization: row[0] ?? null,
        date: row[1] ? get().convertToISODate(row[1]) : null,
        timeStart: row[2] ?? null,
        timeEnd: row[3] ?? null,
        fullName: row[4] ?? null,
        position: row[5] ?? null,
        phone: row[6] ?? null,
      }));

      // Работа с Firestore
      if (!db) {
        throw new Error("Firestore db is not initialized");
      }
      const dutiesCollection = collection(db, "duties");

      // Проверяем существование коллекции и удаляем существующие данные
      try {
        const snapshot = await getDocs(dutiesCollection);
        const deletePromises = snapshot.docs.map((doc) => deleteDoc(doc.ref));
        await Promise.all(deletePromises);
      } catch (error) {
        console.warn(
          "Could not fetch existing duties, assuming collection does not exist:",
          error
        );
        // Если коллекция не существует или доступ запрещен, продолжаем добавление новых данных
      }

      // Добавление новых данных
      const addPromises = duties.map((duty) => addDoc(dutiesCollection, duty));
      await Promise.all(addPromises);

      // Обновление состояния
      set({ isLoading: false });
      get().fetchDuties();
      return { success: true, message: "Данные успешно обновлены" };
    } catch (error) {
      console.error("Error in addNewDuties:", error);
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },
}));

export default useDutyStore;
