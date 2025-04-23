import FileInput from "../../../../shared/components/UI/FileInput/FileInput";
import Button from "../../../../shared/components/UI/Button/Button";
import SubText from "../../../../shared/components/UI/SubText/SubText";
import Error from "../../../../shared/components/UI/Error/Error";

import dutyApiStore from "../../../../shared/store/dutyStore";
import useMessageStore from "../../../../shared/store/messageStore";
import useAdminStore from "../../store/adminStore";

import useOpenExitModal from '../../../../shared/hooks/useOpenExitModal'

function Admin() {
  const logout = useAdminStore((state) => state.logout)
  const openExitModal = useOpenExitModal(logout)
  const { addNewDuties, error } = dutyApiStore();

  const addMessage = useMessageStore((state) => state.addMessage);
  const onSubmit = async (event) => {
    event.preventDefault();
    const res = await addNewDuties(event);
    console.log(res.message);
    addMessage(res.message);
  };

  return (
    <div className="p-6 mt-2 max-w-full sm:max-w-lg mx-auto">
      <form
        id="uploadForm"
        encType="multipart/form-data"
        className="w-full"
        onSubmit={(event) => onSubmit(event)}
      >
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
        <Button type="submit" className="mt-4">
          Загрузить
        </Button>
      </form>
      <div className="mt-8">
        <p className="text-sm text-primary mb-3">Выйти из аккаунта администратора</p>
        <Button onClick={openExitModal}>Выйти</Button>
      </div>
    </div>
  );
}

export default Admin;
