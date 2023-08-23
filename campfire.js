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
room_name = localStorage.getItem("room_name");
console.log(user_name,room_name)

function ChangeHolder(){
      document.getElementById("msg").placeholder="Message in "+room_name;
}

function send(){

      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name : user_name,
            message : msg,
            like : 0
      });
      
      console.log("Message sent: "+msg)

      document.getElementById("msg").value = "";

}

function updateLike(message_id){

      console.log('Clicked on like button - ' + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);
      console.log("Like clicked")

      firebase.database().ref(room_name).child(message_id).update({
            like: updated_likes
      });

}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
      
      console.log(firebase_message_id);
      console.log(message_data);

      Name = message_data['name'];
      message = message_data['message'];
      like = message_data['like'];

      name_with_tag = "<h4 class='soom'>"+Name+"<img src='tick.png' class='user_tick'> </h4>";
      message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
      span_with_tag = "<span>"+like+"</span></button><hr>";
      like_button = "<button id='"+firebase_message_id+"' value='"+like+"' onclick='updateLike(this.id)' class='smalling btn btn-info'>👍"+"</button>";
row = name_with_tag + message_with_tag + like_button + span_with_tag;



      document.getElementById("output").innerHTML+=row;

      } });  }); }
getData();
    

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
      console.log("User logged out")
}
function goback(){
      window.location = "campsites.html";
}