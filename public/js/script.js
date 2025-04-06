const hamburger=document.querySelector(".toggle-btn");
const toggler=document.querySelector("#icon");
hamburger.addEventListener("click",function(){
    document.querySelector("#sidebar").classList.toggle("expand");
    toggler.classList.toggle("bxs-chevrons-left"); 
})

//delete modal
document.querySelectorAll(".delete-btn").forEach(button=>{
    button.addEventListener('click', function(event){
        //Prevent form submission immeidiately
        event.preventDefault();

        //store patient id
        const patientID=this.getAttribute("data-patient-id");

        //store the form id dynamically
        const deleteForm=document.getElementById(`deleteForm-${patientID}`);

        //when the "Yes, Delete" button is clicked in the modal, submit the form
        document.getElementById("confirmDelete").addEventListener('click',function(){
            deleteForm.submit()
        })
    })
})