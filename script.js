async function getUsers(){
  let users;
  try{
    const data=await fetch("https://61ea39387bc0550017bc65d6.mockapi.io/users",{
        method:"GET",
        headers:{
          "content-Type":"application/json",
        },
    }
    );
    users=await data.json();
    console.log(users);
  }catch(error){
    console.log(error);
  }
  return users;
}
//getUsers();
async function displayUsers(){
  let users=await getUsers();
  const userList=document.querySelector(".user-list");
  userList.innerHTML="";
  users.forEach((user) => {
    userList.innerHTML+=`<div class="user-container">
      <img class="user-avatar" src="${user.avatar}" alt="avatar" width="200px" height="200px">
      <div>
        <h3>${user.name}</h3>
        <p>${user.createdAt}</p>
        <button onclick="deleteuser(${user.id})">Delete</button>
        <button onclick="edituser(${user.id})">Update</button>
      </div>
    </div>`
  });
}
displayUsers();

async function deleteuser(id){
  try{
    const data=await fetch(`https://61ea39387bc0550017bc65d6.mockapi.io/users/${id}`,{
      method:"DELETE",
      headers:{
        "content-Type":"application/json",
      },
    }
  );
  const users=await data.json();
  displayUsers();
  }catch(err){
    console.log(err);
  }
}

async function adduser(){
  let username=document.querySelector(".add-user-name").value;
  let useravatar=document.querySelector(".add-avatar").value;
  console.log(username,useravatar);
  try{
    const data=await fetch("https://61ea39387bc0550017bc65d6.mockapi.io/users",{
      method:"POST",
      body:JSON.stringify({
        name:username,
        avatar:useravatar,
      }),
      headers:{
        "content-Type":"application/json",
      },
    }
  );
  displayUsers();
  document.querySelector(".add-user-name").value="";
  document.querySelector(".add-avatar").value="";
  }
  catch(err){
    console.log(err);
  }
}
async function populateInput(id) {
  let username = document.getElementById('username');
  let image = document.getElementById('image');
  try{
      const data=await fetch(`https://61ea39387bc0550017bc65d6.mockapi.io/users/${id}`,{
        method:"GET",
        headers:{
          "content-Type":"application/json",
        },
      }
    );
    const user1=await data.json();
      console.log('user', user1)
      username.innerHTML = `${user1.name}`;
      image.innerHTML = `${user1.avatar}`;
      let updateBtn = document.getElementById('update')
      await updateBtn.addEventListener('click', () => edituser(id))
    }catch(err){
      console.log(err);
    }
}
async function edituser(id){
  let username = document.getElementById('username').value
  let image = document.getElementById('image').value
  console.log('username', username, image);
  try{
    const data=await fetch(`https://61ea39387bc0550017bc65d6.mockapi.io/users/${id}`,{
      method:"PUT",
      headers:{
        "content-Type":"application/json",
      },
      body: JSON.stringify({
          name:username,
          avatar:image,
        })
    }
  );
  const users=await data.json();
  console.log('edited', users)
  displayUsers();
  username.innerHTML="";
  image.innerHTML="";
  }catch(err){
    console.log(err);
  }
}