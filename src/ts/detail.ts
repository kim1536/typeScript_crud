
import { httpServer } from "../http/httpServer";
import { User } from "./dto/user.dto";

let serectId = new URL(location.href).searchParams.get("seq");

const url = "http://localhost:5000/users"

function getUsers(url: string) {
    return new Promise<User>((resolve, reject) => {
      httpServer.get<User>(url)
        .then((data:User) => {
          resolve(data);
        })
        .catch((err: Error) => reject(err));
    });
  }
  

getUsers(`${url}/${serectId}`)
.then(user => {
    const userTable = document.querySelector<HTMLTableElement>('#userTable');
    if( userTable instanceof Element ) {
        userTable.innerHTML += `<tr>
        <td>${user.id}</td>
        <td>${user.userNM}</a></td>
        <td>${user.userId}</td>
        <td>${user.userPW}</td>
        <td>${user.userAg}</td>
        <td>${user.creatDT}</td>
        </tr>`;

    }
    })
.catch(error => {
    console.error(error);
});