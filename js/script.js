document.onload = function(){
        const mainDiv = document.getElementById("main");
        for (i = 0; i < products.length; ++i) {
            let li = document.createElement('div');
            li.innerText = data[i];
            list.appendChild(li);
        }
}