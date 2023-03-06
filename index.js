window.addEventListener("load", function() {
    const form = document.querySelector("#form"),
    searchBar = document.querySelector("#searchBar"),
    searchButton = document.querySelector("#searchButton"),
    imageTarget = document.querySelector("#imageTarget"),
    prompt = document.querySelector("#prompt"),
    formStyle = form.classList,
    searchBarStyle = searchBar.classList,
    searchButtonStyle = searchButton.classList,
    promptStyle = prompt.classList;


    form.addEventListener("submit", function(evt) {
        evt.preventDefault();
        while (imageTarget.firstChild) {
            imageTarget.removeChild(imageTarget.firstChild);
        }
        var searchInput = searchBar.value.trim();
        if (searchInput.length > 0) {
            promptStyle.add("hide");
            formStyle.add("formToTop");
            searchBarStyle.add("searchBarToTop");
            searchButtonStyle.add("buttonToTop");
            var xhr = new XMLHttpRequest();
            xhr.addEventListener("load", function() {
                if (xhr.status == 200) {
                    const info = JSON.parse(xhr.responseText),
                    items = info.collection.items;
                    target = document.querySelector("#imageTarget");
                    for (let i = 0; i < items.length; i++) {
                        const img = document.createElement("img"),
                        imgStyle = img.classList;
                        imgStyle.add("image");
                        img.src = items[i].links[0].href;
                        target.append(img);
                    }
                }
            })
            xhr.open("GET", "https://images-api.nasa.gov/search?q=" + searchInput.trim(), true);
            xhr.send();
            if (imageTarget.childElementCount <= 0) {
                prompt.innerHTML = "No results";
                promptStyle.remove("hide");
            } 
        } else {
            prompt.innerHTML = "Please input a keyword to search";
            promptStyle.remove("hide");
        }
    })
})