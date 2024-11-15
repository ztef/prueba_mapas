

console.log("VIZOR Generic APP")

// index.js

// Create an h1 element
const h1 = document.createElement('h1');
h1.textContent = 'GENERIC APP TEMPLATE';

// Append the h1 element to the body
document.body.appendChild(h1);

import {vi_Window} from "vizor_gui_tools";
import {vi_Collection} from "vizor_collections";
import { vi_Table, vi_Map , vi_EventBus, vi_SelectBox} from "vizor_view_components";

import { vi_MVC_Controller, vi_Store } from "vizor_mvc";



 
window.vizor_project_data_sources = [{"id":"df2f1eaf-d2c7-443d-af4f-5d14d67d9f77","project_id":"099833a7-7a04-431c-8884-867a3d6d42d4","connector_id":"3958dc9e-712f-4377-85e9-fee4b6a6442a","config":"{\n  \"URL\": \"https://server.vizor.studio/examples_data/cat_cedis.json\",\n  \"name\": \"CEDIS\",\n  \"collection\": \"recordset\"\n}","name":"cedis","connector_name":"json_url"}];
window.vizor_domain = 'https://server.vizor.studio';


const w = new vi_Window('myNewWindow1', 'Hello, this is just a window', 300, 300, 'CEDIS', {
    backgroundColor: '#ffffff',
});

const mw = new vi_Window('myNewWindow', 'Hello, this is just a window', 400, 400, 'UBICACION DE CEDIS',{
    backgroundColor: '#ffffff',
});


// Create a new window instance
const w1 = new vi_Window('myNewWindow1', 'Hello, this is just a window', 300, 300, 'COMMAND BOARD', {
    backgroundColor: '#ffffff',
});

// Function to apply the filter
function f_filter() {
    // Get the value from the input field
    const filterValue = combo.selectBox.value;

    // Define the filter query based on input value
    const filterQuery = { RegionDem: filterValue };

    // Apply the filter
    const filteredUsers = store.filterCollection('cedis', filterQuery);
}

// Function to reset the filter
function f_resetFilter() {
    // Reset the filter by showing all entities
    store.releaseFilters('cedis');
}

// Insert the input field and buttons into w1
w1.insertHtmlContent(`
    <div>
        <div>FILTROS</div>
        <div id='combo_place'></div>
        <button id="btn_apply_filter">APLICAR FILTRO</button>
        <button id="btn_reset_filter">RESET FILTER</button>
        
        <br/>
    </div>
`);

// Add event listener to the apply filter button
const applyFilterButton = document.getElementById('btn_apply_filter');
applyFilterButton.addEventListener('click', f_filter);

// Add event listener to the reset filter button
const resetFilterButton = document.getElementById('btn_reset_filter');
resetFilterButton.addEventListener('click', f_resetFilter);



const config = {
    placeholder: 'Choose an Area',
    multiple: false,
    searchable: false,
  };


  const combo = new vi_SelectBox('s0','RegionDem', 'combo_place', config);
  //combo.set({collection:'clientes', result:{data:jsonData}});




const t = new vi_Table("cedis",w,{
    select: true,
    paging: false,
    searching: true,
    ordering: true,
    info: true,
    scrollCollapse: true,
    scrollY: '400px',


    columns: [
      { data: 'id', title: 'ID', visible: true, orderable: true },
      { data: 'Nombre', title: 'CEDI', visible: true, orderable: true },
      { data: 'RegionDem', title: 'Region', visible: true, orderable: false },
      { data: 'EstadoDem', title: 'Estado', visible: true, orderable: false },
      { data: 'lat', title: 'Lat', visible: true, orderable: true },
      { data: 'lon', title: 'Lon', visible: true, orderable: false },
    
   
    ]
  });



  const m = new vi_Map(mw.div);

 
const cedis  = new vi_Collection({datasource:"cedis"});


const mvc = new vi_MVC_Controller();
const store = new vi_Store();

mvc.add_route({origin:cedis, collection:'cedis', target:store , events:['cedis:loaded','cedis:added','cedis:updated','cedis:deleted']})
mvc.add_route({origin:store, collection:'cedis', target:t, events:['cedis:loaded','cedis:added','cedis:updated','cedis:deleted', 'cedis:hide', 'cedis:unhide','cedis:mark','cedis:unmark'] })
mvc.add_route({origin:store, collection:'cedis', target:m, events:['cedis:loaded','cedis:added','cedis:updated','cedis:deleted', 'cedis:hide', 'cedis:unhide','cedis:mark','cedis:unmark'] })
mvc.add_route({origin:store, collection:'cedis', target:combo, events:['cedis:loaded']});


cedis.load();



const event_bus = new vi_EventBus();
event_bus.add(t);  // los eventos como selected de t los envia al bus
event_bus.add(m);  // los eventos de m (selected) los envia al bus



event_bus.on('cedis','selected',(domain,action,data)=>{m.focus(domain, data)})
event_bus.on('cedis','selected',(domain, action,data)=>{t.focus(data)})

