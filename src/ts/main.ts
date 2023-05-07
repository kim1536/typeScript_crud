import { httpServer } from "../http/httpServer"
import { User } from "./dto/user.dto";

const url = "http://localhost:5000/users"

function getUsers(url: string): Promise<User[]>{
  return new Promise<User[]>((resolve, reject) => {
    httpServer.get<User[]>(url)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => reject(err));
  });
}

getUsers(url)
  .then((users) => {
    const userTable = document.querySelector<HTMLTableElement>('#userTable');
    if ( userTable instanceof Element ) {
      users.forEach((user) => {
        userTable.innerHTML += `<tr>
          <td>${user.id}</td>
          <td><a style="cursor:pointer;" id="detailTopic" href="../../src/html/detail.html?seq=${user.id}">${user.userNM}</a></td>
          <td>${user.userId}</td>
          <td>${user.userAg}</td>
          <td>${user.creatDT}</td>
          <td><button type="button" onClick="location.href='../../src/html/edit.html?seq=${user.id}'">수정</button></td>
          <td><button type="button" class="deleteBtn" data-id="${user.id}">삭제</button></td>
        </tr>`;
      });
    
      const deleteButtons = document.querySelectorAll<HTMLButtonElement>(".deleteBtn");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const userId = button.dataset.id;
          if ( userId !== undefined ) {
            onDelete(parseInt(userId))
              .then(() => {
                // 삭제 성공 시 처리
                console.log("삭제 성공");
              })
              .catch((error: Error) => {
                // 삭제 실패 시 처리
                console.error(error);
              });
          } else {
            console.error("userId가 undefined입니다.");
          }
        });
      });
    } else {
      console.error("#userTable 요소를 찾을 수 없습니다.");
    }
  });

function onDelete(userId:number) {
  console.log(`${url}/${userId}`);
  return new Promise(function(resolve, reject) {
    httpServer.delete(`${url}/${userId}`)
      .then(() => {
        resolve(alert("삭제 되었습니다."));
      })
      .catch((error) => {
        console.error(error);
        reject(error);
    });
  });
}





