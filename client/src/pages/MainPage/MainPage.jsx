import { Outlet } from "react-router";
import { useEffect, useState } from "react";

import useMessageStore from "@shared/store/messageStore.js";
import useDutyStore from "@shared/store/dutyStore.js";

import { Header } from "@modules/Header/index";

import Loader from "@shared/components/UI/Loader/Loader.jsx";

function MainPage() {
  const fetchDuties = useDutyStore((state) => state.fetchDuties);
  const isLoading = useDutyStore((state) => state.isLoading);
  const error = useDutyStore((state) => state.error);
  const [offlineMessage, setOfflineMessage] = useState(null);

  const addMessage = useMessageStore((state) => state.addMessage)
  useEffect(() => {
    const loadDuties = async () => {
      try {
        const duties = await fetchDuties();
        if (duties.length < 1) addMessage('Данные дежурст не найдены')

        if (!navigator.onLine) {
          setOfflineMessage("Вы оффлайн. Используются сохраненные данные.");
        }
      } catch (err) {
        if (!navigator.onLine) {
          setOfflineMessage("Вы оффлайн. Данные недоступны.");
        }
      }
    };
    loadDuties()
  }, [fetchDuties]);

  if (isLoading) return <Loader fullPage={true} />;

  return (
    <div>
      {offlineMessage && (
        <div style={{ padding: "10px", background: "#ffeb3b", color: "#333" }}>
          {offlineMessage}
        </div>
      )}
      {error && !offlineMessage && (
        <div style={{ padding: "10px", background: "#f44336", color: "#fff" }}>
          Ошибка: {error}
        </div>
      )}
      <Header />
      <Outlet />
    </div>
  );
}

export default MainPage;
