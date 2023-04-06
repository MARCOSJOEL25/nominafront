export const employees = async () => {
    const data =  await fetch('http://localhost:5231/api/employees').then(resp => resp.json())
    return data
}

export const postAndPut = async (employee) =>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(employee);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    const rel = await fetch("http://localhost:5231/api/employees", requestOptions)
      .then(response => response.json())
      .catch(error => console.log('error', error));

      console.log(rel)
}


export const Delete = async(id) => {
    var raw = "";

    var requestOptions = {
      method: 'DELETE',
      body: raw,
      redirect: 'follow'
    };

    const rel = await fetch(`http://localhost:5231/api/employees?id=${id}`, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('error', error));

      console.log(rel)
}

export const extra = async ( id, extras ) =>{
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "id": 0,
    "employeeId": id,
    "adicciónSalary": extras,
    "motivo": "string"
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const resp = await fetch("http://localhost:5231/adiccion", requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));
  
  return resp.statusCode
}
  

export const login =  async ( payload ) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(payload);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    var rel = await fetch("http://localhost:5231/api/User/Login", requestOptions)
      .then(response => response.json())
      .catch(error => console.log('error', error));
    console.log(rel.statusCode)
    return rel.statusCode == 200  
} 

export const prestaciones = async (id) => {

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  const data = await fetch(`http://localhost:5231/api/employees/prestaciones/${id}`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));

    return data
} 