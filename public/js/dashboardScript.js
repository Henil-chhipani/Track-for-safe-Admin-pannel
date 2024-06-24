
// const table = document.getElementById("userTable");

// fetch('/getUserData')
//     .then(response => response.json())
//     .then(data => {
//         const userData = JSON.stringify(data,null,2);
//         console.log(userData)
//         const row = table.insertRow(0);
//         const cell1 = row.insertCell(0);
//         cell1.innerHTML = ``;
//     });

const table = document.getElementById("userTable");

const safe_no = document.getElementById("safe_no");
const total_no = document.getElementById("total_no");
fetch('/getUserData')
    .then(response => response.json())
    .then(data => {
        const userData = data;
        console.log(userData);
        let count = 0;
        
        // Iterate over each user in the data
        for (let userId in userData) {
            if (userData.hasOwnProperty(userId)) {
                const user = userData[userId];
                const row = table.insertRow();
                count++;
                // Create a cell for the user's name and city
                const cell = row.insertCell();
                const h4 = document.createElement('h4');
                h4.innerHTML = `${user.Name}<br><span>${user.City}</span>`;
                cell.appendChild(h4);   
            }
            
        }
        safe_no.innerHTML=count;
        total_no.innerHTML=count;
        
    });

