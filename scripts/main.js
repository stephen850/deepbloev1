function openOffer(){document.getElementById("offer-overlay").classList.add("active");document.body.style.overflow="hidden";document.getElementById("offer-overlay").scrollTop=0;}
function closeOffer(){document.getElementById("offer-overlay")).classList.remove("active");document.body.style.overflow="";}

function submitOffer(e){
  e.preventDefault();
  var d=new FormData(document.getElementById("offer-form"));
  var lines=["=== DEEPBLOE BOOKING OFFER FORM ===","",
    "--- OFFER DETAILS ---",
    "Date(s): "+d.get("dates"),
    "Artist(s): "+d.get("artists"),
    "Fee: "+d.get("fee"),
    "Additional Terms: "+d.get("additional_terms"),
    "Flights: "+d.get("flights")+" ("+d.get("flights_type")+")",
    "Hotel: "+d.get("hotel")+" ("+d.get("hotel_type")+")","",
    "--- YOUR DETAILS ---",
    "Name: "+d.get("contact_name"),
    "Title: "+d.get("contact_title"),
    "Office: "+d.get("contact_office"),
    "Mobile: "+d.get("contact_mobile"),
    "Email: "+d.get("contact_email"),"",
    "--- PURCHASER ---",
    "Company: "+d.get("company_name"),
    "Address: "+d.get("company_address")+", "+d.get("company_city")+" "+d.get("company_postal"),
    "Phone: "+d.get("company_phone"),
    "Signatory: "+d.get("signatory")+" | "+d.get("signatory_mobile")+" | "+d.get("signatory_email"),"",
    "--- VENUE & EVENT ---",
    "Event: "+d.get("event_name"),
    "Venue: "+d.get("venue_name")+", "+d.get("venue_address")+", "+d.get("venue_city"),
    "Phone: "+d.get("venue_phone")+" | Website: "+d.get("venue_website"),
    "Capacity: "+d.get("capacity")+" | Age: "+d.get("age"),
    "Tickets: "+d.get("tickets"),
    "Door/Show: "+d.get("door_time")+" | Curfew: "+d.get("curfew"),
    "Venue Type: "+d.get("venue_type"),
    "Set Time: "+d.get("set_time")+" | Stage: "+d.get("stage"),
    "Other Artists: "+d.get("other_artists"),
    "Other Set Times: "+d.get("other_set_times"),
    "Series: "+d.get("series"),"",
    "--- HISTORY ---",
    "Venue History: "+d.get("venue_history"),
    "Agency History: "+d.get("agency_history"),
    "Comments: "+d.get("comments")
  ];
  var subject=encodeURIComponent("Booking Offer: "+d.get("artists")+" - "+d.get("dates"));
  var body=encodeURIComponent(lines.join("\n"));
  window.location.href="mailto:stephen@deepbloe.com?subject="+subject+"&body="+body;
  document.getElementById("offer-success").style.display="block";
  document.getElementById("offer-form").reset();
}

function handleSubmit(e){
  e.preventDefault();
  var form=document.getElementById("contact-form");
  var data=new FormData(form);
  var subject=encodeURIComponent("Deepbloe Contact: "+(data.get("type")||""));
  var body=encodeURIComponent("Name: "+data.get("name")+"\nEmail: "+data.get("email")+"\nType: "+data.get("type")+"\n\n"+data.get("message"));
  window.location.href="mailto:stephen@deepbloe.com?subject="+subject+"&body="+body;
  document.getElementById("form-success").style.display="block";
  form.reset();
}

function acceptCookies(){try{localStorage.setItem("cookies","accepted");}catch(e){}document.getElementById("cookie-banner").style.display="none";}
function rejectCookies(){try{localStorage.setItem("cookies","rejected");}catch(e){}document.getElementById("cookie-banner").style.display="none";}
function showPrivacy(){document.getElementById("privacy-modal").style.display="block";}
try{if(localStorage.getItem("cookies"))document.getElementById("cookie-banner").style.display="none";}catch(e){}

// Nav scroll
window.addEventListener("scroll",function(){
  var nav=document.querySelector("nav");
  if(nav) nav.classList.toggle("scrolled",window.scrollY>50);
});

// Reveal on scroll
(function(){
  var revealEls=document.querySelectorAll(".reveal");
  revealEls.forEach(function(el){el.classList.add("animate-hidden");});
  var ro=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){entry.target.classList.remove("animate-hidden");entry.target.classList.add("visible");ro.unobserve(entry.target);}
    });
  },{threshold:0.1,rootMargin:"0px 0px -40px 0px"});
  revealEls.forEach(function(el){ro.observe(el);});
})();

// Accordion
document.querySelectorAll(".service-row").forEach(function(row){
  row.addEventListener("click",function(){
    var isOpen=row.classList.contains("open");
    document.querySelectorAll(".service-row").forEach(function(r){r.classList.remove("open");});
    if(!isOpen)row.classList.add("open");
  });
});

// Counter
(function(){
  var els=document.querySelectorAll("[data-target]");
  if(!els.length)return;
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting||e.target._done)return;
      e.target._done=true;
      var target=+e.target.getAttribute("data-target");
      var span=e.target.querySelector(".count");
      if(!span)return;
      var t0=performance.now(),dur=1800;
      function tick(t){var p=Math.min((t-t0)/dur,1);span.textContent=Math.round((1-Math.pow(1-p,3))*target);if(p<1)requestAnimationFrame(tick);else span.textContent=target;}
      requestAnimationFrame(tick);
      io.unobserve(e.target);
    });
  },{threshold:0.5});
  els.forEach(function(el){io.observe(el);});
})();
