let arr = new Array();
function readFormData() {
    var name =document.getElementById('name').value;
    var gender=document.getElementById('gender').value;
    var email = document.getElementById('email').value;
    var phoneno =document.getElementById('phoneno').value;
    var pwd =document.getElementById('pwd').value;
    var cpwd = document.getElementById('cpwd').value;

    const user = (
        name,
        gender,
        email,
        phoneno,
        pwd,
        cpwd,
    ) => {
        let arr = JSON.parse(localStorage.getItem("user") || "[]");
        let detail = {
            name: name,
            gender: gender,
            email: email,
            phoneno: phoneno,
            pwd: pwd,
            cpwd: cpwd,
        }
        
        arr.push(detail);
    window.localStorage.setItem("user", JSON.stringify(arr));

    }
   user(name, gender,email,phoneno,pwd,cpwd);
}
function display() {
    var data = JSON.parse(localStorage.getItem("user"));
    for (let i=0; i< data.length; i++){
        var table = document.getElementById("tbody");
        var tr = document.createElement('tr');
        table.appendChild(tr);
        
    var td = document.createElement('td');
    var node = document.createTextNode(data[i].name);
    td.appendChild(node);
    tr.appendChild(td);

    var td1 = document.createElement('td');
    var node1 = document.createTextNode(data[i].gender);
    td1.appendChild(node1);
    tr.appendChild(td1);

    var td2 = document.createElement('td');
    var node2 = document.createTextNode(data[i].email);
    td2.appendChild(node2);
    tr.appendChild(td2);

    var td3 = document.createElement('td');
    var node3 = document.createTextNode(data[i].phoneno);
    td3.appendChild(node3);
    tr.appendChild(td3);

    var td4 = document.createElement('td');
    var node4 = document.createTextNode(data[i].pwd);
    td4.appendChild(node4);
    tr.appendChild(td4);

    var td5 = document.createElement('td');
    var node5 = document.createTextNode(data[i].cpwd);
    td5.appendChild(node5);
    tr.appendChild(td5);
    

    var td6 = document.createElement('td');
    const button = document.createElement('button');
    const node6 = document.createTextNode("Edit");
    button.setAttribute("nodeid",i);
    button.appendChild(node6);
    td6.appendChild(button);
    tr.appendChild(td6);
    button.onclick=edit;

    const td7= document.createElement('td');
    const button2 = document.createElement('button');
    const node7 = document.createTextNode("Delete");
    button2.setAttribute("nodeid",i);
    button2.appendChild(node7);
    td7.appendChild(button2);
    tr.appendChild(td7);
    button2.onclick = deleterow;
    
    // button2.addEventListener("click", deleterow(i));
   
    
    } 
   // console.log(JSON.parse(localStorage.getItem("user")));
 

}


function edit(e){
    const id = Number(e.target.getAttribute("nodeid"));
    const storageTmp = JSON.parse(localStorage.getItem("user"));
    console.log(storageTmp[id].name);
    console.log(id);

    const child = document.getElementsByTagName('tr')[id+1].innerHTML=`<tr> 
            <td><input type="text" id = "name${id}" value="${storageTmp[id].name}" onblur="tnv(${id})"> <br><p id="demo${id}"></p> </td>
            <td><input type="text" id = "gender${id}" value="${storageTmp[id].gender}"> </td>
            <td><input type="text" id = "email${id}" value="${storageTmp[id].email}" onblur="tne(${id})"> <br><p id="demo2${id}"></p> </td>
            <td><input type="text" id = "phoneno${id}" value="${storageTmp[id].phoneno}" onblur="tnp(${id})"> <br><p id="demo3${id}"></p> </td>
            <td><input type="text" id = "pwd${id}" value="${storageTmp[id].pwd}" onblur="tpwd(${id})"> <br><p id="demo4${id}"></p> </td
            <td><input type="text" id = "cpwd${id}" value="${storageTmp[id].cpwd}" onblur="tcpwd(${id})"> <br><p id="demo5${id}"></p> </td>
            
            <td><button id="save${id}" class="save" onclick='save(${id})'>save</button></td>
            <td><button id="delete${id}">Delete</button></td>
    
    </tr>`;
    console.log(child);
    // document.getElementById(`save${id}`).onclick = save;
    document.getElementById(`delete${id}`).addEventListener("click",deleterow);

    
    
}


function save(e){
    //const id = Number(e.target.getAttribute("nodeid"));
    var n = tnv(e);
    var em = tne(e);
    var p = tnp(e);
    var pw = tpwd(e);
    var tcpw = tcpwd(e);
    if(n && em && p && pw && tcpw ){
        const storageTmp = JSON.parse(localStorage.getItem("user"));
        console.log(storageTmp);
        console.log(e);
    
        var name =document.getElementById(`name${e}`).value;
        var gender=document.getElementById(`gender${e}`).value;
        var email = document.getElementById(`email${e}`).value;
        var phoneno =document.getElementById(`phoneno${e}`).value;
        var pwd =document.getElementById(`pwd${e}`).value;
        var cpwd = document.getElementById(`cpwd${e}`).value;
    
        
        storageTmp[e].name=name;
        storageTmp[e].gender=gender;
        storageTmp[e].email=email;
        storageTmp[e].phoneno=phoneno;
        storageTmp[e].pwd=pwd;
        storageTmp[e].cpwd=cpwd;
        window.localStorage.setItem("user",JSON.stringify(storageTmp));
        //localStoragedata();
    
        document.querySelectorAll("table tbody tr").forEach(function(e){e.remove()})
    
        display(); 
    }
         
   

   // document.getElementById(`name${id}`).addEventListener("blur", tnv());
}


function tnv(id){
    var name = document.getElementById(`name${id}`).value;
    if(name == ''){
        document.getElementById(`demo${id}`).style.display = "block";
        document.getElementById(`demo${id}`).style.color = "Red";
        document.getElementById(`demo${id}`).style.border = "Red";
        document.getElementById(`demo${id}`).innerHTML = "Invalid value for name.";
        //`save${id}.style.display="none"`;
        return false;

    } else {
        document.getElementById(`demo${id}`).style.display = "none";
        //`save${id}.style.display="inline"`;
        return true;  
    }
}

function tne(id){
            
    var str = document.getElementById(`email${id}`).value;
    var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if(!pattern.test(str)){
        document.getElementById(`demo2${id}`).style.display = "block";
        document.getElementById(`demo2${id}`).innerHTML = "Invalid emailid format.";
        document.getElementById(`demo2${id}`).style.color = "Red";
        //save${id}.style.display="none";
        return false;
    } else {
        document.getElementById(`demo2${id}`).style.display = "none";
        document.getElementById(`demo2${id}`).innerHTML = "You got success!!!";
        //`save${id}`.style.display="inline";
        return true;
    }   
}


function tnp(id){

    var phone = document.getElementById(`phoneno${id}`).value;
            var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
            if(!re.test(phone)){
                document.getElementById(`demo3${id}`).style.display = "block";
                document.getElementById(`demo3${id}`).style.color = "Red";
                document.getElementById(`demo3${id}`).innerHTML = "Phone number length must be 10.";
               // `save${id}`.style.display="none";
                return false;
            }else {
                document.getElementById(`demo3${id}`).style.display = "none";
                //`save${id}`.style.display="inline";
            }
            return true;
}



function tpwd(id){
    var pwd = document.getElementById(`pwd${id}`).value;
            if (pwd.length === 0 || pwd.length < 5 || pwd.length>12){
                document.getElementById(`demo4${id}`).style.display = "block";
                document.getElementById(`demo4${id}`).style.color = "Red";
                document.getElementById(`demo4${id}`).innerHTML = "Invalid Password format.";
                //`save${id}`.style.display="none";
                return false;
            }else {
                document.getElementById(`demo4${id}`).style.display = "none";
               // `save${id}`.style.display="inline";
                return true;
            }

}


function tcpwd(id){
    if(document.getElementById(`pwd${id}`).value !== document.getElementById(`cpwd${id}`).value){
        document.getElementById(`demo5${id}`).style.display = "block";
        document.getElementById(`demo5${id}`).style.color = "Red";
        document.getElementById(`demo5${id}`).innerHTML = "Invalid Password .";
        //`save${id}`.style.display="none";
        return false;
    }else {
        document.getElementById(`demo5${id}`).style.display = "none";
        //`save${id}`.style.display="inline";
        return true;
    }
}



function deleterow(e){

    const id = Number(e.target.getAttribute("nodeid"));
    const storageTmp = JSON.parse(localStorage.getItem("user"));
    console.log(id);
    // for(var index=0; index<storageTmp.length;index++){
        storageTmp.splice(id,1);
    // }
    
    
    localStorage.setItem("user", JSON.stringify(storageTmp));
    console.log("user");
    
    document.querySelectorAll("table tbody tr").forEach(function(e){e.remove()})

    display();
    //location.reload();
}




function sortTable(a) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("employeeList");
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length -1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[a];
        y = rows[i + 1].getElementsByTagName("TD")[a];
        // Check if the two rows should switch place:
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }

