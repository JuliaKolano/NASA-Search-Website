window.addEventListener("load", function() {
    const body = document.querySelector("#body")
    form = document.querySelector("#form"),
    searchBar = document.querySelector("#searchBar"),
    searchButton = document.querySelector("#searchButton"),
    imageTarget = document.querySelector("#imageTarget"),
    prompt = document.querySelector("#prompt"),
    loading = document.querySelector("#loading"),
    details = document.querySelector("#details"),
    bodyStyle = body.classList,
    formStyle = form.classList,
    searchBarStyle = searchBar.classList,
    searchButtonStyle = searchButton.classList,
    imageTargetStyle = imageTarget.classList,
    promptStyle = prompt.classList,
    loadingStyle = loading.classList,
    detailsStyle = details.classList;


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

                    console.log(info);
                    for (let i = 0; i < items.length; i++) {
                        const title = document.createElement("p"),
                            date = document.createElement("p"),
                            description = document.createElement("p"),
                            img = document.createElement("img"),
                            imgStyle = img.classList,
                            titleStyle = title.classList,
                            dateStyle = date.classList,
                            descriptionStyle = description.classList;

                        title.innerHTML = items[i].data[0].title;
                        date.innerHTML = "Date: " + items[i].data[0].date_created;
                        description.innerHTML = "Description: " + items[i].data[0].description;
                        img.src = items[i].links[0].href;
                        imgStyle.add("image");
                        target.append(img);
                        img.addEventListener("click", function() {
                            formStyle.add("hide");
                            imageTargetStyle.add("hide");
                            imgStyle.remove("image");
                            imgStyle.add("detailsImage");
                            titleStyle.add("titleParagraph");
                            dateStyle.add("paragraph");
                            descriptionStyle.add("paragraph");
                            details.append(img);
                            details.append(title);
                            details.append(date);
                            details.append(description);
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