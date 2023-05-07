import { httpServer } from "../http/httpServer";
import { User } from "./dto/user.dto";

const today = new Date();
const year = today.getFullYear(); // 년도
const month = today.getMonth() + 1; // 월
const monthDT = month < 10 ? "0" + month : month;
const date = today.getDate();
const dateDT = date < 10 ? "0" + date : date;

const url = "http://localhost:5000/users";

const addForm = document.querySelector<HTMLFormElement>("#userAdd");
if (addForm instanceof Element) {
  addForm.addEventListener("submit", (e) => {
    e.preventDefault();

    httpServer
      .get<User[]>(url)
      .then((data) => {
        const formData: User = {
          id: data.length+1,
          userId: addForm.userId.value,
          userPW: addForm.userPW.value,
          userNM: addForm.userNM.value,
          userAg: addForm.userAg.value,
          creatDT: `${year}-${monthDT}-${dateDT}`,
        };

        return httpServer.post<User>(url, formData);
      })
      .then((data) => {
        console.log("성공", data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
}
