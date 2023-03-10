window.addEventListener("load", function() {
    // Global variables
    const body = document.querySelector("#body")
    form = document.querySelector("#form"),
    searchBar = document.querySelector("#searchBar"),
    searchButton = document.querySelector("#searchButton"),
    imageTarget = document.querySelector("#imageTarget"),
    prompt = document.querySelector("#prompt"),
    loading = document.querySelector("#loading"),
    details = document.querySelector("#details"),
    references = document.querySelector("#references"),
    heading = document.querySelector("#heading"),
    bodyStyle = body.classList,
    formStyle = form.classList,
    searchBarStyle = searchBar.classList,
    searchButtonStyle = searchButton.classList,
    imageTargetStyle = imageTarget.classList,
    promptStyle = prompt.classList,
    loadingStyle = loading.classList,
    detailsStyle = details.classList,
    referencesStyle = references.classList,
    headingStyle = heading.classList;

    headingStyle.add("hide");
    searchButton.value = "";
    // Submit button pressed
    form.addEventListener("submit", function(evt) {
        evt.preventDefault();
        promptStyle.add("hide");
        // Delete previous results
        while (imageTarget.firstChild) {
            imageTarget.removeChild(imageTarget.firstChild);
        }
        const searchInput = searchBar.value.trim();
        // User input validation
        if (searchInput.length > 0) {
            // Display loading screen
            formStyle.add("hide");
            detailsStyle.add("hide");
            referencesStyle.add("hide");
            loadingStyle.remove("hide");
            let xhr = new XMLHttpRequest();
            xhr.addEventListener("load", function() {
                loadingStyle.add("hide");
                formStyle.add("formToTop");
                searchBarStyle.add("searchBarToTop");
                searchButtonStyle.add("buttonToTop");
                formStyle.remove("hide");
                imageTargetStyle.remove("hide");
                detailsStyle.add("hide");
                // Successfull request
                if (xhr.status == 200) {
                    const info = JSON.parse(xhr.responseText),
                        items = info.collection.items;
                        target = document.querySelector("#imageTarget");
                    // Add images to the screen
                    for (let i = 0; i < items.length; i++) {
                        // Create all elements
                        const title = document.createElement("p"),
                            date = document.createElement("p"),
                            description = document.createElement("p"),
                            img = document.createElement("img"),
                            imageLinks = items[i].links,
                            imgStyle = img.classList,
                            titleStyle = title.classList,
                            dateStyle = date.classList,
                            descriptionStyle = description.classList;
                        // Check if the image links are valid
                        if (imageLinks != undefined) {
                            // Get info about images
                            // Normally innerHTML should not be used due to a security issue
                            // however in this case NASA is a reputible source so there shouldn't
                            // be any malicious code exeuted. And for some of the images the links
                            // inside of the description look better using innerHTML rather than
                            // using the textContent attribute
                            title.innerHTML = items[i].data[0].title;
                            date.innerHTML = "Date: " + (items[i].data[0].date_created).substring(0, 10);
                            description.innerHTML = "Description: " + items[i].data[0].description;
                            img.src = items[i].links[0].href;
                            imgStyle.add("image");
                            target.append(img);
                        }
                        // After clicking on a generated image
                        img.addEventListener("click", function() {
                            //hide all other elements
                            while (details.firstChild) {
                                details.removeChild(details.firstChild);
                            }
                            imageTargetStyle.add("hide");
                            detailsStyle.remove("hide");
                            imgStyle.remove("image");
                            imgStyle.add("detailsImage");
                            titleStyle.add("titleParagraph");
                            dateStyle.add("paragraph");
                            descriptionStyle.add("paragraph");
                            //Add image info to the screen
                            details.append(img);
                            details.append(title);
                            details.append(date);
                            details.append(description);
                        });
                    }
                    // No images match the search input
                    if (imageTarget.childElementCount <= 0) {
                        prompt.innerHTML = "No results";
                        promptStyle.remove("hide");
                    }
                }
            })
            // Send the request
            xhr.open("GET", "https://images-api.nasa.gov/search?q=" + searchInput, true);
            xhr.send();
        // No user input
        } else {
            prompt.innerHTML = "Please input a keyword to search";
            promptStyle.remove("hide");
            detailsStyle.add("hide");
        }
    })
})