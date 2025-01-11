

const Additional = ({img,data,name}) => {
   
    
  return (
    <div className="bg-white bg-opacity-20  p-4 rounded-lg text-center">
          <img 
          src={img} 
          alt="Humidity Icon" 
          className="w-10 h-10 mx-auto mb-2" />
            <p className="text-lg font-medium">{name}</p>
            <p className="text-2xl font-bold">{ data}</p>
          </div>
  )
}

export default Additional