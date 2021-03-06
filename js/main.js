$(document).ready(function() {
    $( '.reloadhome' ).click(function() {
        location.reload();
    });

    console.log("88b           d88                                   88                                  88                  db         ");
    console.log("888b         d888                            ,d     ``                                  88                 d88b        ");
    console.log("88`8b       d8`88                            88                                         88                d8``8b       ");
    console.log("88 `8b     d8` 88  ,adPPYYba,  8b,dPPYba,  MM88MMM  88  88,dPYba,,adPYba,    ,adPPYba,  88               d8`  `8b      ");
    console.log("88  `8b   d8`  88  ``     `Y8  88P`    `8a   88     88  88P`   `88`    `8a  a8P_____88  88              d8YaaaaY8b     ");
    console.log("88   `8b d8`   88  ,adPPPPP88  88       d8   88     88  88      88      88  8PP```````  88             d8````````8b    ");
    console.log("88    `888`    88  88,    ,88  88b,   ,a8`   88,    88  88      88      88  `8b,   ,aa  88            d8`        `8b   ");
    console.log("88     `8`     88  ``8bbdP`Y8  88`YbbdP``    `Y888  88  88      88      88   ``Ybbd8``  88888888888  d8`          `8b  ");
    console.log("                               88                                                                                      ");
    console.log("                               88                                                                                      ");

    // global
    var ALL_CONTACTS = window.ALL_CONTACTS = [];
    var markerMap = {}; //Creates marker array to match with list ids
    var map = L.map('map').setView([36.745487, -119.553223], 6);
        map.options.minZoom = 6;
    var countysim;
    var contactHasNoData = {}; // tracks whether a contact has (contact info) data available or not, key = contact name, value = boolean
    var citysim;
    var cityboundaries;


    var countyCentroids = [{"lng":-122.5366816,"lat":41.58968795,"county":"siskiyou"}, {"lng":-123.8899247,"lat":41.73994992,"county":"delnorte"}, {"lng":-120.7206515,"lat":41.58516037,"county":"modoc"}, {"lng":-123.8641933,"lat":40.69769468,"county":"humboldt"}, {"lng":-123.1051426,"lat":40.64672324,"county":"trinity"}, {"lng":-122.0370162,"lat":40.75881081,"county":"shasta"}, {"lng":-120.5890627,"lat":40.66947743,"county":"lassen"}, {"lng":-122.2252265,"lat":40.12045534,"county":"tehama"}, {"lng":-120.8381152,"lat":40.00224361,"county":"plumas"}, {"lng":-121.5929202,"lat":39.66194744,"county":"butte"}, {"lng":-123.3785645,"lat":39.436311,"county":"mendocino"}, {"lng":-122.3824784,"lat":39.59749241,"county":"glenn"}, {"lng":-120.5053974,"lat":39.57804778,"county":"sierra"}, {"lng":-121.341521,"lat":39.26711113,"county":"yuba"}, {"lng":-122.7455076,"lat":39.0977424,"county":"lake"}, {"lng":-120.779702,"lat":39.34777011,"county":"nevada"}, {"lng":-122.232684,"lat":39.17929818,"county":"colusa"}, {"lng":-120.6952731,"lat":39.10904184,"county":"placer"}, {"lng":-121.6879415,"lat":39.03343522,"county":"sutter"}, {"lng":-120.5178479,"lat":38.77542129,"county":"eldorado"}, {"lng":-121.8969613,"lat":38.68696758,"county":"yolo"}, {"lng":-119.8169037,"lat":38.59444829,"county":"alpine"}, {"lng":-122.3272815,"lat":38.50756884,"county":"napa"}, {"lng":-122.8870565,"lat":38.52807795,"county":"sonoma"}, {"lng":-121.3184884,"lat":38.46539335,"county":"sacramento"}, {"lng":-118.8811807,"lat":37.93314536,"county":"mono"}, {"lng":-120.6451459,"lat":38.44232883,"county":"amador"}, {"lng":-120.54516,"lat":38.2016097,"county":"calaveras"}, {"lng":-119.94757,"lat":38.02482502,"county":"tuolumne"}, {"lng":-122.7199862,"lat":38.07302983,"county":"marin"}, {"lng":-121.2630036,"lat":37.93446409,"county":"sanjoaquin"}, {"lng":-121.912773,"lat":38.2890738,"county":"solano"}, {"lng":-121.9118881,"lat":37.91338972,"county":"contracosta"}, {"lng":-120.9917255,"lat":37.55504696,"county":"stanislaus"}, {"lng":-121.8773402,"lat":37.64288125,"county":"alameda"}, {"lng":-119.8985583,"lat":37.57576665,"county":"mariposa"}, {"lng":-122.4300983,"lat":37.746708,"county":"sanfrancisco"}, {"lng":-119.7479641,"lat":37.21288345,"county":"madera"}, {"lng":-122.3220076,"lat":37.42426013,"county":"sanmateo"}, {"lng":-120.7050631,"lat":37.18711003,"county":"merced"}, {"lng":-119.6448418,"lat":36.75484323,"county":"fresno"}, {"lng":-121.6829577,"lat":37.227335,"county":"santaclara"}, {"lng":-117.4009716,"lat":36.50847442,"county":"inyo"}, {"lng":-121.9845385,"lat":37.05475688,"county":"santacruz"}, {"lng":-121.0601999,"lat":36.60571773,"county":"sanbenito"}, {"lng":-121.2271719,"lat":36.21805195,"county":"monterey"}, {"lng":-118.7931193,"lat":36.22142632,"county":"tulare"}, {"lng":-119.8037558,"lat":36.07843551,"county":"kings"}, {"lng":-118.7299935,"lat":35.34697619,"county":"kern"}, {"lng":-116.1739686,"lat":34.84493269,"county":"sanbernardino"}, {"lng":-120.3991097,"lat":35.38931175,"county":"sanluisobispo"}, {"lng":-119.0757298,"lat":34.47193847,"county":"ventura"}, {"lng":-115.9941072,"lat":33.74760232,"county":"riverside"}, {"lng":-120.0125184,"lat":34.67169706,"county":"santabarbara"}, {"lng":-117.756341,"lat":33.70405276,"county":"orange"}, {"lng":-116.7382821,"lat":33.03654358,"county":"sandiego"}, {"lng":-118.2227689,"lat":34.32161489,"county":"losangeles"}, {"lng":-115.3664041,"lat":33.04094176,"county":"imperial"}];

    function init() {
        $.ajax({
            type: "GET",
            url: "data/gis_contacts.csv",
            dataType: "text",
            success: function(data) {
                processData(data);
                setContactHasNoData();
                createSearchHandler();
                setNavbarHandlers();
                setListItemHandlers();
                mapInit();
            }
         });
    }



    init();

    function processData(data){

        var csvData = Papa.parse(data, {
            header: true
        });

        ALL_CONTACTS = csvData.data;
        parseData(csvData.data);
    }

    function parseData(data) {

        var federalArray = [];
        var stateArray = [];
        var countyArray = [];
        var cityArray = [];
        var otherArray = [];

        // loop through and append any federal agencies to federal list
        for (var i = 0; i < data.length; i++) {
            // federal
            if (data[i].type === "Federal") {
                federalArray.push(data[i]);
            } else if (data[i].type === "State") {
                stateArray.push(data[i]);
            } else if (data[i].type === "County") {
                countyArray.push(data[i]);
            } else if (data[i].type === "City") {
                cityArray.push(data[i]);
            } else if (data[i].type === "Other") {
                otherArray.push(data[i]);
            }
            if (data[i] && data[i].display_name) {
                data[i].id = normalizeString(data[i].display_name);
            }
        }

        //alphabetize arrays & send to addChild function
        sortArray(federalArray);
        sortArray(stateArray);
        sortArray(countyArray);
        sortArray(cityArray);
        sortArray(otherArray);

        addChild(federalArray,"federal-list");
        addChild(stateArray,"state-list");
        addChild(countyArray,"county-list");
        addChild(cityArray,"city-list");
        addChild(otherArray,"other-list");


        function sortArray(item){
            return item.sort(function(a,b){
                var nameA=a.display_name.toLowerCase(), nameB=b.display_name.toLowerCase();
                if (nameA < nameB){
                    return -1;
                }else if(nameA > nameB){
                    return 1;
                }else{
                    return 0;
                }
            });
        } // sortArray()
    } // parseData()

    // Appends the items to the list
    function addChild(array,list) {

        for (var i = 0; i < array.length; i++){
            var listItem = document.createElement('li');
            var textnode = document.createElement('span');
            listItem.id = array[i].id;
            textnode.innerHTML = array[i].display_name
            listItem.appendChild(textnode);
            listItem.className = 'list-item';

            var name = (array[i].first_name.length > 0 && array[i].last_name.length > 0) ? '<p>Contact: ' + array[i].first_name + ' ' + array[i].last_name + '</p>' : '';
            var title = (array[i].title.length > 0) ? '<p>' + array[i].title + '</p>' : '';
            var dept = "";
            // var dept = (array[i].agency_department.length > 0) ? '<p>' + array[i].agency_department + '</p>' : '';
            var email = (array[i].email.length > 0) ? '<p><a href="mailto:' + array[i].email + '">' + array[i].email + '</a></p>' : '';
            var homepage = (array[i].homepage != undefined && array[i].homepage.length > 0) ? '<p><a target="_blank" href="' + array[i].homepage + '">Homepage</a></p>' : '';
            var gis = (array[i].gis_page != undefined && array[i].gis_page.length > 0) ? '<p><a target="_blank" href="' + array[i].gis_page + '">GIS page</a></p>' : '';
            var data = (array[i].data_page != undefined && array[i].data_page.length > 0) ? '<p><a target="_blank" href="' + array[i].data_page + '">Data page</a></p>' : '';
            var addcontact = (array[i].first_name.length == 0) ? '<p>This information out of date? <a href="https://docs.google.com/forms/d/1D_6IMIDp3e6xzMrgH06rnLaNkm-jgEwVOQ8Ro2y4AkY/viewform" target="_blank">Update here.</a></p>' : '<p>This information out of date? <a href="https://docs.google.com/forms/d/1D_6IMIDp3e6xzMrgH06rnLaNkm-jgEwVOQ8Ro2y4AkY/viewform" target="_blank">Update here.</a></p>';
            // create the more info box
            var div = document.createElement('div');
            div.innerHTML = name +
                            title +
                            dept +
                            email +
                            homepage +
                            gis +
                            data +
                            addcontact;
            var totalData = div.innerHTML;
            div.className = 'item-info';
            if (totalData == '<p>This information out of date? <a href="https://docs.google.com/forms/d/1D_6IMIDp3e6xzMrgH06rnLaNkm-jgEwVOQ8Ro2y4AkY/viewform" target="_blank">Update here.</a></p>') {
                listItem.setAttribute("data-info", "no-data");
            } else {
                listItem.setAttribute("data-info", "has-data");
            }
            listItem.appendChild(div);
            document.getElementById(list).appendChild(listItem);
        }

    } // addChild()

    // setcontactHasNoData sets up the data in global contactHasNoData hash
    function setContactHasNoData() {
        for (var i=0; i<ALL_CONTACTS.length;i++){
            var contact = ALL_CONTACTS[i];

            if (contact.display_name && contact.display_name.length > 0 ) {
                var name = contact.display_name;
                var hasNoContactInfo = contact.first_name === "" && contact.last_name === "";
                contactHasNoData[name] = hasNoContactInfo;
            }
        }
    }

  // map
    function mapInit(){
        //Gets and returns colors for Cities that have a web page link in geojson file
        function setcityfillop(d) {
            var d = String(d);
            return d == 'null' ? '.1' :
                '.7';
        }
        //This loads the map

        var cityStyleData = {
            radius: 3,
            weight: 1.0,
            fillColor: "#47a3da", //checks to see if data has webpage, returns nofill if no data,
            fillOpacity: 0.7,
            color: "#47a3da",
            className: 'citymarker'
        }

        var cityStyleNoData = {
            radius: 3,
            weight: 1.0,
            fillColor: "#47a3da", //checks to see if data has webpage, returns nofill if no data,
            fillOpacity: 0.1,
            color: "#47a3da",
            className: 'citymarker'
        }

        var stamenLayer = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png', {
            attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>,               under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
        }).addTo(map).setOpacity(.75);


        //Styles
        function countylines(feature)  {
            var countyName = feature.properties.NAME_PCASE + " County";
            var fillColor, fillOpacity;
            var countyHasNoContactInfo = contactHasNoData[countyName];

            if (countyHasNoContactInfo) {
                fillColor = "#fff";
                fillOpacity = 0;
            } else {
                fillColor = "#47a3da";
                fillOpacity = 0.05;
            }

            return {
                fillColor: fillColor,
                weight: .5,
                opacity: 1,
                color: '#47a3da',
                dashArray: '3',
                fillOpacity: fillOpacity
            };
        };

        function citylines(feature)  {
            var cityName = feature.properties.NAME;
            var fillColor;
            var cityHasNoContactInfo = contactHasNoData[cityName];

            if (cityHasNoContactInfo) {
                fillColor = "#fff";
            } else {
                fillColor = "#47a3da";
            }

            return {
                fillColor: fillColor,
                weight: 1,
                opacity: 1,
                color: '#47a3da',
                fillOpacity:0.5,
            };
        };

        //Adds city boundaries
        cityboundaries = new L.geoJson.ajax("data/cityboundaries2015.geojson", {
            //var cityStyle = (String(feature.properties["GIS Page"]) === 'null') ? cityStyleNoData : cityStyleData;
            style: citylines,
            onEachFeature: function(feature, layer) {
                            layer.on({
                            mouseover: highlightFeature,
                            mouseout: resetcityHighlight,
                            //click: zoomToFeature
                            });
                for (var i=0; i<ALL_CONTACTS.length;i++){


                    if(ALL_CONTACTS[i].display_name == feature.properties.NAME){
                        var firstname = ALL_CONTACTS[i].first_name;
                        var lastname = ALL_CONTACTS[i].last_name;
                        var fullname = "<b>Name:</b> " + firstname + " " + lastname + "<br>";
                        var title = "<b>Title:</b> " + ALL_CONTACTS[i].title  + "<br>";
                        var agency_department = "<b>Agency:</b> " + ALL_CONTACTS[i].agency_department + "<br>";
                        var email = "<b>email:</b> " + ALL_CONTACTS[i].email + "<br>";
                        var phone = "<b>Phone:</b> " + ALL_CONTACTS[i].phone + "<br>";
                        var homepage = ALL_CONTACTS[i].homepage;
                        var gisPage  = ALL_CONTACTS[i].gis_page;
                        var applications_page = ALL_CONTACTS[i].applications_page;
                        var newline = "<br>";

                        if (homepage == ""){
                            homepage = "<b>Homepage:</b> Not available" +newline;
                        }else{
                            homepage = "<b>Homepage:</b> " + '<a target="_blank" href="' + homepage + '">Link</a>' +newline;
                        }
                        if (gisPage == ""){
                            gisPage = "<b>GIS Page:</b> No GIS page available" +newline;
                            layer.setStyle({fillOpacity:.1})
                        }else{
                            gisPage = "<b>GIS Page:</b> " + '<a target="_blank" href="' + gisPage + '">Link</a>' +newline;
                        }

                        if (applications_page == ""){
                            applications_page = "<b>Applications Page:</b> Not available" +newline;
                        }else{
                            applications_page = "<b>Applications Page:</b> " + '<a target="_blank" href="' + applications_page + '">Link</a>' +newline;
                        }
                    }
                }

                layer.bindPopup("<b>City:</b> " + feature.properties.NAME + "<br> " +
                    fullname +
                    title +
                    agency_department +
                    email +
                    phone +
                    homepage +
                    gisPage +
                    applications_page +
                    '<br>This information out of date?<br><a href="https://docs.google.com/forms/d/1D_6IMIDp3e6xzMrgH06rnLaNkm-jgEwVOQ8Ro2y4AkY/viewform" target="_blank">Update here.</a>');
            }
        });

    function highlightFeature(e) {
        var layer = e.target;
        layer.setStyle({
        color: '#666',
        fillOpacity: 0.7
    });
    }

    function resetcityHighlight(e) {
    if(e.target._popupContent.indexOf("No GIS page available") <=0){
    cityboundaries.resetStyle(e.target);}
        else {
            e.target.setStyle(
                {
                fillOpacity:.1,
                color:'#47a3da'
                }
            )}
            }


    function resetHighlight(e) {
        countysim.resetStyle(e.target);
        }

    function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
    }

        //Adds county boundaries
        countysim = new L.geoJson.ajax("data/countysimple.geojson", {
            style: countylines,
            onEachFeature: function(feature, layer) {
                var countyName = layer.feature.properties.NAME_PCASE.toLowerCase().replace(' ','');
                var countyID = countyName + 'county';
                // when county id is clicked
                $("#"+countyID).click(function(event) {
                    // console.log(layer.getBounds());
                    for (var j = 0; j < countyCentroids.length; j++) {
                        if (countyCentroids[j].county === countyName) {
                            // centers map and opens popup at pre-calculated centroid
                            map.setView([countyCentroids[j].lat,countyCentroids[j].lng],8,{animate: true}); //Zooms to and centers map
                            layer.openPopup([countyCentroids[j].lat,countyCentroids[j].lng]);
                        }
                    }
                }); 
                
                layer.on({
                    mouseover: highlightFeature,
                    mouseout: resetHighlight
                });
	            for (var i=0; i<ALL_CONTACTS.length;i++){


                    if(ALL_CONTACTS[i].display_name == feature.properties.NAME_PCASE+" County"){
                        var firstname = ALL_CONTACTS[i].first_name;
                        var lastname = ALL_CONTACTS[i].last_name;
                        var fullname = "<b>Name:</b> " + firstname + " " + lastname + "<br>";
                        var title = "<b>Title:</b> " + ALL_CONTACTS[i].title  + "<br>";
                        var agency_department = "<b>Agency:</b> " + ALL_CONTACTS[i].agency_department + "<br>";
                        var email = "<b>email:</b> " + ALL_CONTACTS[i].email + "<br>";
                        var phone = "<b>Phone:</b> " + ALL_CONTACTS[i].phone + "<br>";
                        var homepage = ALL_CONTACTS[i].homepage;
                        var gisPage  = ALL_CONTACTS[i].gis_page;
                        var applications_page = ALL_CONTACTS[i].applications_page;
                        var newline = "<br>";

                        if (homepage == ""){
                            homepage = "<b>Homepage:</b> Not available" +newline;
                        }else{
                            homepage = "<b>Homepage:</b> " + '<a target="_blank" href="' + homepage + '">Link</a>' +newline;
                        }
                        if (gisPage == ""){
                            gisPage = "<b>GIS Page:</b> No GIS page available" +newline;
                        }else{
                            gisPage = "<b>GIS Page:</b> " + '<a target="_blank" href="' + gisPage + '">Link</a>' +newline;
                        }

                        if (applications_page == ""){
                            applications_page = "<b>Applications Page:</b> Not available" +newline;
                        }else{
                            applications_page = "<b>Applications Page:</b> " + '<a target="_blank" href="' + applications_page + '">Link</a>' +newline;
                        }
                    }
                }

            layer.bindPopup("<b>County:</b> " + feature.properties.NAME_PCASE + "<br> " +
                    fullname +
                    title +
                    agency_department +
                    email +
                    phone +
                    homepage +
                    gisPage +
                    applications_page +
                    '<br>This information out of date?<br><a href="https://docs.google.com/forms/d/1D_6IMIDp3e6xzMrgH06rnLaNkm-jgEwVOQ8Ro2y4AkY/viewform" target="_blank">Update here.</a>');
            } // onEachFeature
        }).addTo(map);

        //Adds City Markers
        var markerlayer = L.layerGroup().addTo(map);
        citysim = new L.geoJson.ajax("data/cities.geojson", {
            pointToLayer: function(feature, latlng) {

                for (var i=0; i<ALL_CONTACTS.length;i++){

                    if(ALL_CONTACTS[i].display_name == feature.properties["NAMELSAD"]){
                        var firstname = ALL_CONTACTS[i].first_name;
                        var lastname = ALL_CONTACTS[i].last_name;
                        var fullname = "<b>Name:</b> " + firstname + " " + lastname + "<br>";
                        var title = "<b>Title:</b> " + ALL_CONTACTS[i].title  + "<br>";
                        var agency_department = "<b>Agency:</b> " + ALL_CONTACTS[i].agency_department + "<br>";
                        var email = "<b>email:</b> " + ALL_CONTACTS[i].email + "<br>";
                        var phone = "<b>Phone:</b> " + ALL_CONTACTS[i].phone + "<br>";
                        var homepage = ALL_CONTACTS[i].homepage;
                        var gisPage  = ALL_CONTACTS[i].gis_page;
                        var applications_page = ALL_CONTACTS[i].applications_page;
                        var newline = "<br>";

                        if (homepage == ""){
                            homepage = "<b>Homepage:</b> Not available" +newline;
                        } else {
                            homepage = "<b>Homepage:</b> " + '<a target="_blank" href="' + homepage + '">Link</a>' +newline;
                        }
                        if (gisPage == ""){
                            gisPage = "<b>GIS Page:</b> No GIS page available" +newline;
                        } else {
                            gisPage = "<b>GIS Page:</b> " + '<a target="_blank" href="' + gisPage + '">Link</a>' +newline;
                        }

                        if (applications_page == ""){
                            applications_page = "<b>Applications Page:</b> Not available" +newline;
                        } else {
                            applications_page = "<b>Applications Page:</b> " + '<a target="_blank" href="' + applications_page + '">Link</a>' +newline;
                        }
                    }
                }

                var cityStyle = (String(feature.properties["GIS Page"]) === 'null') ? cityStyleNoData : cityStyleData;

                var marker = new L.circleMarker(latlng, cityStyle).bindPopup("<b>City:</b> " + feature.properties.NAMELSAD + "<br> " +
                    fullname +
                    title +
                    agency_department +
                    email +
                    phone +
                    homepage +
                    gisPage +
                    applications_page +
                    '<br>This information out of date?<br><a href="https://docs.google.com/forms/d/1D_6IMIDp3e6xzMrgH06rnLaNkm-jgEwVOQ8Ro2y4AkY/viewform" target="_blank">Update here.</a>');
                markerMap[normalizeString(feature.properties.NAMELSAD)] = marker;
                return marker;
            }
        }).addTo(markerlayer);
        }

    //function to change radius on zoom
    function changeRadius(rad) {
        $.each(markerMap, function (key, value){value.setRadius(rad/1.5)}); //takes current zoom and divides by number to return radius size
      }

    map.on('zoomend', function() {
        var currentZoom = map.getZoom();
        changeRadius(currentZoom);
    });


    //Functions when zooming in or out
    map.on('zoomend', function() {
        var currentZoom = map.getZoom();
        if (currentZoom > 9){
            map.addLayer(cityboundaries);
            map.removeLayer(countysim);
            $('.citymarker').css({"display":"none"}); // hide cities
        } else {
            $('.citymarker').css({"display":"block"}); // show cities
            map.removeLayer(cityboundaries);
            map.addLayer(countysim);
            map.addLayer(citysim);
            citysim.bringToFront();
        }
    });


    function createSearchHandler() {
        $( "form.search" ).submit(function( event ) {
            event.preventDefault();

            var query = $('#list-search').val();
            var check, check_name;
            var results = [];
            var listItem, textnode;
            var checkListItemID;

            // clear sidebar
            resetAllSections();
            $('.group-list').addClass("visible-item");
            $('.list-item').addClass('hidden');

            // hide all the cateogry heads
            $("#federal-title").css("display","none");
            $("#state-title").css("display","none");
            $("#county-title").css("display","none");
            $("#city-title").css("display","none");
            $("#other-title").css("display","none");

            // hide no results
            $('#results .none').addClass('hide');

            // Arrays to show certain groups of categories
            var feds = [],
                states = [],
                counties = [],
                cities = [],
                usrgroups = [];

            if(query.length === 0) {
               } else {
                for(var i=0; i<ALL_CONTACTS.length; i++) {
                    check = ALL_CONTACTS[i];
                    if(check && check.display_name){
                        check_name = check.display_name;

                        if (normalizeString(check_name).indexOf(normalizeString(query)) > -1) {
                            checkListItemID = normalizeString(check_name);
                            // put it into the right array
                            if (check.type === "Federal") {
                                feds.push(checkListItemID);
                            } else if (check.type === "State") {
                                states.push(checkListItemID);
                            } else if (check.type === "County") {
                                counties.push(checkListItemID);
                            } else if (check.type === "City") {
                                cities.push(checkListItemID);
                            } else if (check.type === "Other") {
                                usrgroups.push(checkListItemID);
                            }
                        }
                    }
                }

                // loop through the groups of items, adding header if large enough
                // federal
                if (feds.length > 0) {
                    $("#federal-title").css("display","block");
                    for (var i = 0; i < feds.length; i++) {
                        $("#"+feds[i]).removeClass('hidden');
                    }
                }
                // states
                if (states.length > 0) {
                    $("#state-title").css("display","block");
                    for (var i = 0; i < states.length; i++) {
                        $("#"+states[i]).removeClass('hidden');
                    }
                }
                // counties
                if (counties.length > 0) {
                    $("#county-title").css("display","block");
                    for (var i = 0; i < counties.length; i++) {
                        $("#"+counties[i]).removeClass('hidden');
                    }
                }
                // cities
                if (cities.length > 0) {
                    $("#city-title").css("display","block");
                    for (var i = 0; i < cities.length; i++) {
                        $("#"+cities[i]).removeClass('hidden');
                    }
                }
                // other
                if (usrgroups.length > 0) {
                    $("#other-title").css("display","block");
                    for (var i = 0; i < usrgroups.length; i++) {
                        $("#"+usrgroups[i]).removeClass('hidden');
                    }
                }
                // if all arrays 0, show "no results"
                if (feds.length === 0 && states.length === 0 && counties.length === 0 && cities.length === 0 && usrgroups.length === 0) {
                    $('#results .none').removeClass('hide');
                }
            }
        });
    }

    function normalizeString(inputString) {
        // lowercase & remove non-alphanumeric characters
        return inputString.toLowerCase().replace(/\W/g, '');
    }

    function setListItemHandlers() {
        $(".list-item").click(function (e) {

            if ($(e.target).is('a')) {
                return;
            }

            e.preventDefault();
            $(".item-info").removeClass("visible-item");
            $(this).children("div").addClass("visible-item");

            var $listItem = $(this);
            var $theList = $('#big-list');

            var itemHeight = $listItem.height();
            var itemTopOffset = $listItem.offset().top;
            var listHeight = $theList[0].scrollHeight; // includes overflow
            var listVisibleHeight = $theList.height(); // visible area only, excludes the hidden overflow

            // make listItem visible if it is hidden at the bottom of the #big-list
            if ( itemTopOffset > listVisibleHeight ) {
                $theList.scrollTop(listHeight - itemHeight);
            }

            // Matches list id to markermap array
            var markerId = $listItem.attr( 'id' );
            var marker = markerMap[markerId];

            if (marker && marker.getLatLng()) {
                map.setView([marker.getLatLng().lat,marker.getLatLng().lng],10,{animate: true}); //Zooms to and centers map
                marker.openPopup(); // open popup
            }

        });

    }

    function setNavbarHandlers() {
        $('nav li.federal').on('click', function(e){
            e.preventDefault();
            resetAllSections();
            $('#federal-title.list-title').addClass('active');
            $('#federal-list.group-list').addClass("visible-item");
            $('nav li.federal').addClass('active');
        });

        $('nav li.state').on('click', function(e){
            e.preventDefault();
            resetAllSections();
            $('#state-title.list-title').addClass('active');
            $('#state-list.group-list').addClass("visible-item");
            $('nav li.state').addClass('active');
        });

        $('nav li.county').on('click', function(e){
            e.preventDefault();
            resetAllSections();
            $('#county-title.list-title').addClass('active');
            $('#county-list.group-list').addClass("visible-item");
            $('nav li.county').addClass('active');
        });

        $('nav li.city').on('click', function(e){
            e.preventDefault();
            resetAllSections();
            $('#city-title.list-title').addClass('active');
            $('#city-list.group-list').addClass("visible-item");
            $('nav li.city').addClass('active');
        });

        $('nav li.other').on('click', function(e){
            e.preventDefault();
            resetAllSections();
            $('#other-title.list-title').addClass('active');
            $('#other-list.group-list').addClass("visible-item");
            $('nav li.other').addClass('active');
        });
    }

    function resetAllSections() {
        $('.list-title').removeClass('active');
        $('.group-list').removeClass('visible-item');
        $('.list-item').removeClass('hidden');
        $('nav li').removeClass('active');
        $('#results-list').empty();
        $(".item-info").removeClass("visible-item");
        $('#big-list').scrollTop(0);
        $(".list-title").css("display","none");
    }

});


