
async function addvideoGame (id) {
    const cart = document.cookie.split("=") [1];
    const res = await fetch(`/api/carts/${cart}/videogames/${id}`,{
        method:"PUT"
    })
    const result = await res.json();
    console.log(result);
}