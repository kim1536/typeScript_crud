export const httpServer = {
  get<T> (url: string): Promise<T> {
    const fetchOptions: RequestInit = {
      method: 'GET'
    };
  
    return new Promise((resolve, reject) => {
      fetch(url, fetchOptions)
        .then(response => {
          if (!response.ok) {
            reject(new Error(`HTTP Error ${response.status} - ${response.statusText}`));
          }
          return resolve(response.json());
        })
        .catch(error => {
          reject(new Error(`Network Error - ${error.message}`));
        });
    })
  },
  post<T> (url: string, data: T): Promise<T> {
    const fetchOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  
    return new Promise((resolve, reject) => {
      fetch(url, fetchOptions)
        .then(response => {
          if (!response.ok) {
            reject(new Error(`HTTP Error ${response.status} - ${response.statusText}`));
          }
          return resolve(response.json());
        })
        .catch(error => {
          reject(new Error(`Network Error - ${error.message}`));
        });
    })
  },
  put<T> (url: string, data: T): Promise<T> {
    debugger
    const fetchOptions: RequestInit = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  
    return new Promise((resolve, reject) => {
      fetch(url, fetchOptions)
        .then(response => {
          if (!response.ok) {
            reject(new Error(`HTTP Error ${response.status} - ${response.statusText}`));
          }
          return resolve(response.json());
        })
        .catch(error => {
          reject(new Error(`Network Error - ${error.message}`));
        });
    })
  },
  delete<T> (url: string): Promise<T> {
    const fetchOptions: RequestInit = {
      method: 'DELETE',
    };
    return new Promise((resolve, reject) => {
      fetch(url, fetchOptions)
        .then(response => {
          if (!response.ok) {
            reject(new Error(`HTTP Error ${response.status} - ${response.statusText}`));
          }
          return resolve(response.json());
        })
        .catch(error => {
          reject(new Error(`Network Error - ${error.message}`));
        });
    })
  },
};