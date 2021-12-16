const st = document.querySelector('#Status');
socket.on("how_many",(value)=>{
    st.innerText = value;
});