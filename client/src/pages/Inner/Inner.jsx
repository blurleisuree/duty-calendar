import Input from "../../shared/components/UI/Input/Input";
import Button from "../../shared/components/UI/Button/Button";

import useApiStore from "../../shared/store/apiStore";

function Inner() {
  const { duties, addNewDuties, getDuties } = useApiStore();

  const onSubmit = (event) => {
    event.preventDefault();
    addNewDuties(event);
  };

  const onClick = async () => {
    await getDuties();
    console.log(duties)
  };

  return (
    <div className="flex justify-center items-center h-full max-w-1/3 mx-auto">
      <form
        id="uploadForm"
        encType="multipart/form-data"
        className="w-full"
        onSubmit={(event) => onSubmit(event)}
      >
        <Input
          className="max-w-72"
          id="excelFile"
          name="excelFile"
          type="file"
          required={true}
          accept=".xlsx, .xls"
        >
          Добавьте файл
        </Input>
        <Button type="submit" className="mt-4">
          Загрузить
        </Button>
      </form>
      <Button onClick={onClick} className="mt-4">
        getDuties
      </Button>
    </div>
  );
}

export default Inner;
