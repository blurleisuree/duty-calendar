import Input from "../../shared/components/UI/Input/Input";
import Button from "../../shared/components/UI/Button/Button";

import dutyApiStore from "../../shared/store/dutyStore";

function Inner() {
  const { duties, addNewDuties, getDutiesByOrganization, getDutiesByDate } = dutyApiStore();

  const onSubmit = (event) => {
    event.preventDefault();
    addNewDuties(event);
  };

  const onClick = async () => {
    console.log(getDutiesByDate());
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
        fetchDuties
      </Button>
    </div>
  );
}

export default Inner;
