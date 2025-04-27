import FileInput from "@shared/components/UI/FileInput/FileInput";
import Button from "@shared/components/UI/Button/Button";
import SubText from "@shared/components/UI/SubText/SubText";
import Error from "@shared/components/UI/Error/Error";
import ErrorAdmin from "../ErrorAdmin/ErrorAdmin";

import dutyApiStore from "@shared/store/dutyStore";
import useMessageStore from "@shared/store/messageStore";
import { useAuthStore } from "../../../Auth/index";

function Admin() {
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const { addNewDuties, isLoading, error } = dutyApiStore();
  const addMessage = useMessageStore((state) => state.addMessage);

  const onSubmit = async (event) => {
    event.preventDefault();
    const file = event.target.elements.excelFile.files[0]; 
    if (!file) {
      addMessage("Пожалуйста, выберите файл");
      return;
    }

    try {
      const res = await addNewDuties(file); 
      addMessage(res.message);
    } catch (err) {
      addMessage("Ошибка загрузки: " + err.message);
    }
  };

  if (!isAdmin) return <ErrorAdmin />;

  return (
    <div className="p-6 mt-2 max-w-full sm:max-w-lg mx-auto">
      <form id="uploadForm" className="w-full" onSubmit={onSubmit}>
        <FileInput
          id="excelFile"
          name="excelFile"
          type="file"
          required={true}
          accept=".xlsx, .xls"
        >
          Добавьте файл
        </FileInput>
        <SubText className="mt-2 font-light text-sm">
          xlsx, xls (макс. 3MB)
        </SubText>
        <Error>{error}</Error>
        <Button type="submit" className="mt-4" disabled={isLoading}>
          {isLoading ? "Загрузка..." : "Загрузить"}
        </Button>
      </form>
    </div>
  );
}

export default Admin;
