/* 
 * (C) 2020 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
import { router } from "/framework/js/router.mjs";
import { monkshu_component } from "/framework/js/monkshu_component.mjs";
import { apimanager as apiman } from "/framework/js/apimanager.mjs";

const getUsers = async () => {
    let resp = await apiman.rest(APP_CONSTANTS.API_GET, "GET", {}, false, true);
    if (!resp || !resp.result) router.reload();
    // app_crud.shadowRoot.querySelector("#first_name").value = resp.results.message[0].first_name;
    // app_crud.shadowRoot.querySelector("#last_name").value = resp.results.message[0].last_name;

    console.log("Response: " + JSON.stringify(resp.results.message));
    //remove all rows
    let tbody = app_crud.shadowRoot.querySelector("#tbody");
   //check if tbody is empty
    if (tbody.hasChildNodes()) {
        while (tbody.firstChild) tbody.removeChild(tbody.firstChild);
    }
    for (let i = 0; i < resp.results.message.length; i++) {
        let user = resp.results.message[i];
        let new_row = document.createElement("tr");
        new_row.innerHTML = `<td>${user.id}</td><td>${user.first_name}</td><td>${user.last_name}</td>
        <td><input type='button' value='EDIT' onclick='monkshu_env.components["app-crud"].viewUser(${user.id})'></input></td>
        <td><input type='button' value='DELETE' onclick='monkshu_env.components["app-crud"].deleteUser(${user.id})'></input></td>`;
        app_crud.shadowRoot.querySelector("#tbody").appendChild(new_row);
    }

}

const viewUser = async (id) => {
    let resp = await apiman.rest(APP_CONSTANTS.API_VIEW, "POST", {id: id}, false, true);
    if (!resp || !resp.result) router.reload(); 

    let first_name = resp.results.message[0].first_name;
    let last_name = resp.results.message[0].last_name;
    app_crud.shadowRoot.querySelector("#first_name").value = first_name;
    app_crud.shadowRoot.querySelector("#last_name").value = last_name;
    app_crud.shadowRoot.querySelector("#item_id").innerHTML = id;
    
    app_crud.shadowRoot.querySelector("#save_btn").style.display = "none";
    app_crud.shadowRoot.querySelector("#update-container").style.display = "block";
}   

const addUser = async () => {
    let first_name = app_crud.shadowRoot.querySelector("#first_name").value;
    let last_name = app_crud.shadowRoot.querySelector("#last_name").value;
    app_crud.shadowRoot.querySelector("#first_name").value = "";
    app_crud.shadowRoot.querySelector("#last_name").value = "";
    
    let resp = await apiman.rest(APP_CONSTANTS.API_ADD, "POST", {first_name: first_name, last_name: last_name}, false, true);
    if (!resp || !resp.result) router.reload();
    console.log("Saved")
}

const updateUser = async () => {
    let id = app_crud.shadowRoot.querySelector("#item_id").innerHTML;
    let first_name = app_crud.shadowRoot.querySelector("#first_name").value;
    let last_name = app_crud.shadowRoot.querySelector("#last_name").value;

    app_crud.shadowRoot.querySelector("#first_name").value = "";
    app_crud.shadowRoot.querySelector("#last_name").value = "";
    app_crud.shadowRoot.querySelector("#item_id").innerHTML = "";

    let resp = await apiman.rest(APP_CONSTANTS.API_UPDATE, "POST", {id: id, first_name: first_name, last_name: last_name}, false, true);
    if (!resp || !resp.result) router.reload();

    console.log("Updated")
}

const deleteUser = async (id) => {
    let resp = await apiman.rest(APP_CONSTANTS.API_DELETE, "POST", {id: id}, false, true);
    if (!resp || !resp.result) router.reload();
    console.log("Deleted")
}

function cancel() {
    app_crud.shadowRoot.querySelector("#save_btn").style.display = "block";
    app_crud.shadowRoot.querySelector("#update-container").style.display = "none";
    app_crud.shadowRoot.querySelector("#first_name").value = "";
    app_crud.shadowRoot.querySelector("#last_name").value = "";
    app_crud.shadowRoot.querySelector("#item_id").innerHTML = "";
}

function register() {
    // convert this all into a WebComponent so we can use it
    monkshu_component.register("app-crud", `${APP_CONSTANTS.APP_PATH}/components/app-crud/app-crud.html`, app_crud);
}

const trueWebComponentMode = true;	// making this false renders the component without using Shadow DOM

export const app_crud= { trueWebComponentMode, register, getUsers, addUser, viewUser, updateUser, deleteUser, cancel } // this will be used by the crud.html and app-crud.html file
