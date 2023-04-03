export const employees = async () => {
    const data =  await fetch('http://localhost:5231/api/employees').then(resp => resp.json())
    console.log(data)
    return data
}

