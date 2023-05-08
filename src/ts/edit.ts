import { httpServer } from "../http/httpServer";
import { User } from "./dto/user.dto";

const searchParams = new URLSearchParams(location.search);
const secretId = searchParams.get("seq");

const url = "http://localhost:5000/users";

const today = new Date();
const year = today.getFullYear(); // 년도
const month = today.getMonth() + 1; // 월
const date = today.getDate();

getUser(`${url}/${secretId}`);

function getUser(url: string) {
  return httpServer.get<User>(url)
    .then((user) => {
      const userTable = document.querySelector<HTMLDivElement>('#userEditDiv');
      if (userTable !== null) {
        userTable.innerHTML += `<form id="userEdit">
          <label> USER ID:
            <input type="text" name="userId" placeholder="${user.userId}" required>
          </label>
          </br>
          <label> USER PW:
            <input type="text" name="userPW" placeholder="${user.userPW}" required>
          </label>
          </br>
          <label> USER NM:
            <input type="text" name="userNM" placeholder="${user.userNM}" required>
          </label>
          </br>
          <label> AGE:
            <input type="number" name="userAg" max="100" placeholder="${user.userAg}" required>
          </label>
          </br>
          <button type="submit">등록</button>
        </form>`;
      } else {
        console.error("#userTable 요소를 찾을 수 없습니다.");
      }

      const editForm = document.querySelector<HTMLFormElement>("#userEdit");
      if (editForm !== null) {
        editForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const userFormData: User = {
            id: Number(secretId),
            userId: (e.target as HTMLFormElement).userId.value,
            userPW: (e.target as HTMLFormElement).userPW.value,
            userNM: (e.target as HTMLFormElement).userNM.value,
            userAg: (e.target as HTMLFormElement).userAg.value,
            creatDT: `${year}-${month}-${date}`,
          };
          onEdit(url, userFormData)
            .then(() => {
              location.href = "/main.html";
            })
            .catch((err) => console.error(err));
            debugger
        });
      }
      return user;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

function onEdit(url: string, userFormData: User): Promise<void> {
  return httpServer.put<User>(url, userFormData)
    .then(() => {
      console.log('User edited successfully.');
    })
    .catch((error) => {
      console.error(`Error editing user: ${error}`);
      throw error;
    });
}