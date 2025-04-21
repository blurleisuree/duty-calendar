import Input from "../../../../shared/components/UI/Input/Input";
import Button from "../../../../shared/components/UI/Button/Button";
import SubText from "../../../../shared/components/UI/SubText/SubText";
import Error from "../../../../shared/components/UI/Error/Error";

import dutyApiStore from "../../../../shared/store/dutyStore";
import useMessageStore from "../../../../shared/store/messageStore";

function Admin() {
  const { addNewDuties, error } = dutyApiStore();

  const addMessage = useMessageStore((state) => state.addMessage);
  const onSubmit = async (event) => {
    event.preventDefault();
    const res = await addNewDuties(event);
    console.log(res.message)
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
        <Input
          id="excelFile"
          name="excelFile"
          type="file"
          required={true}
          accept=".xlsx, .xls"
        >
          Добавьте файл
        </Input>
        <SubText className="mt-2 font-light text-sm">
          xlsx, xls (макс. 3MB)
        </SubText>
        <Error>{error}</Error>
        <Button type="submit" className="mt-4">
          Загрузить
        </Button>
      </form>
    </div>
  );
}

export default Admin;
