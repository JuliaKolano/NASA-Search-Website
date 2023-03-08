window.addEventListener("load", function() {
    const body = document.querySelector("#body")
    form = document.querySelector("#form"),
    searchBar = document.querySelector("#searchBar"),
    searchButton = document.querySelector("#searchButton"),
    imageTarget = document.querySelector("#imageTarget"),
    prompt = document.querySelector("#prompt"),
    loading = document.querySelector("#loading"),
    bodyStyle = body.classList,
    formStyle = form.classList,
    searchBarStyle = searchBar.classList,
    searchButtonStyle = searchButton.classList,
    imageTargetStyle = imageTarget.classList,
    promptStyle = prompt.classList,
    loadingStyle = loading.classList,


    form.addEventListener("submit", function(evt) {
        evt.preventDefault();
        promptStyle.add("hide");
        while (imageTarget.firstChild) {
            imageTarget.removeChild(imageTarget.firstChild);
        }
        var searchInput = searchBar.value.trim();
        if (searchInput.length > 0) {
            formStyle.add("hide");
            bodyStyle.add("noBackground")
            loadingStyle.remove("hide");
            var xhr = new XMLHttpRequest();
            xhr.addEventListener("load", function() {
                loadingStyle.add("hide");
                formStyle.add("formToTop");
                searchBarStyle.add("searchBarToTop");
                searchButtonStyle.add("buttonToTop");
                formStyle.remove("hide");
                bodyStyle.remove("noBackground");
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
                        img.addEventListener("click", function() {
                            imageTargetStyle.add("hide");
                            bodyStyle.add("blurBackground");
                            
                        });
                    }
                    if (imageTarget.childElementCount <= 0) {
                        prompt.innerHTML = "No results";
                        promptStyle.remove("hide");
                    }
                }
            })
            xhr.open("GET", "https://images-api.nasa.gov/search?q=" + searchInput.trim(), true);
            xhr.send();
        } else {
            prompt.innerHTML = "Please input a keyword to search";
            promptStyle.remove("hide");
        }
    })
})

// function displayDetails() {
//     bodyStyle.add("blurBackground");
// }