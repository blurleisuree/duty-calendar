import Input from "../../shared/components/UI/Input/Input";
import Button from "../../shared/components/UI/Button/Button";

function Inner() {
  return (
    <div className="flex justify-center items-center h-full max-w-1/3 mx-auto">
      <form id="uploadForm" encType="multipart/form-data" className="w-full">
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
    </div>
  );
}

export default Inner;
