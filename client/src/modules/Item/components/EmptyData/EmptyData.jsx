import error from '../../../../assets/icons/error.svg'

function EmptyData() {
  return (
    <div className='mx-auto mt-20'>
      <img src={error} alt="error" className='mx-auto'/>
      <h3 className='text-center mt-4 text-primary text-md'>На данную дату нет данных</h3>
    </div>
  )
}

export default EmptyData
