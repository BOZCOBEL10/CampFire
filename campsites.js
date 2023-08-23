var firebaseConfig = {
      apiKey: "AIzaSyAZ__cIIF5ZBDImyzK_z-HaOBf9ym1X7kQ",
      authDomain: "mzgjy21.firebaseapp.com",
      databaseURL: "https://mzgjy21-default-rtdb.firebaseio.com/",
      projectId: "mzgjy21",
      storageBucket: "mzgjy21.appspot.com",
      messagingSenderId: "422820971893",
      appId: "1:422820971893:web:c0cfc3dad965af37c73f3c"
    };
    
    // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");

document.getElementById("user_name_welcome").innerHTML="Welcome "+user_name;

function addRoom(){
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
          message:user_name+":"+""
      });

      localStorage.setItem("room_name",room_name);
      window.location = "campfire.html";

}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      console.log("Room name - "+Room_names);
      row = "<div class='room_name' id="+Room_names+" onClick='redirecttoRoomName(this.id)'>#"+Room_names+"</div><hr>";
      document.getElementById("output").innerHTML+=row;

      });});}
getData();

function redirecttoRoomName(name){

      console.log(name);
      localStorage.setItem("room_name",name);
      window.location = "campfire.html";

}

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}