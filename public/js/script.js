const hamburger=document.querySelector(".toggle-btn");
if(hamburger){
    const toggler=document.querySelector("#icon");
    hamburger.addEventListener("click",function(){
    document.querySelector("#sidebar").classList.toggle("expand");
    toggler.classList.toggle("bxs-chevrons-left"); 
})
}


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

// DELETING Questions
let pendingDelete = null;

function confirmDelete(type, sectionIndex, qIndex = null) {
  const modal = new bootstrap.Modal(document.getElementById('deleteConfirmationModal'));
  const messageEl = document.getElementById('confirmDeleteMessage');

  if (type === 'section') {
    messageEl.textContent = 'Delete this section?';
    pendingDelete = () => deleteSection(sectionIndex);
  } else if (type === 'question') {
    messageEl.textContent = 'Delete this question?';
    pendingDelete = () => deleteQuestion(sectionIndex, qIndex);
  }

  modal.show();
}

document.addEventListener('DOMContentLoaded', () => {
  const confirmBtn = document.getElementById('confirmDeleteBtn');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      if (typeof pendingDelete === 'function') {
        pendingDelete();
        pendingDelete = null;
      }
      const modal = bootstrap.Modal.getInstance(document.getElementById('deleteConfirmationModal'));
      modal.hide();
    });
  }
});

// DELETING PATIENTS

// Chart JS for Daily Check-In
const chartData=window.chartData || []

const labels=chartData.map(d=>d.date);
const values=chartData.map(d=> d.patientCount);

const chartElement = document.getElementById('patientChart')

if(chartElement){
  const ctx=chartElement.getContext('2d');
  new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'No. of Patients',
          data: values,
          borderColor: '#198754',
          backgroundColor: 'rgba(8, 106, 60, 0.2)',
          tension: 0.4,
          fill: true,
          pointRadius: 5,
          pointHoverRadius: 7
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true
          }
        }
      }
    });
  }

//Pie chart for male and female
const genderPieData=window.genderPieData || [];

const genderPie=document.getElementById("genderPieChart");

if(genderPie){
  const ctx = genderPie.getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: genderPieData.labels,
      datasets: [{
        label: 'Gender Distribution',
        data: genderPieData.data,
        backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)'],
        hoverOffset: 4
      }]
    },
    options: {  
      responsive: true,
      plugins: {
        legend: {
          position:"top"
        },       
      }
    }
  });
}
 


// Handling follow-up questions
document.addEventListener('DOMContentLoaded', ()=> {
  const followUps = document.querySelectorAll('.follow-up');

  followUps.forEach(fu => {
    const parentId = fu.getAttribute('data-parent');
    const parentInput = document.getElementById(parentId);

    if (!parentInput) return;

    parentInput.addEventListener('change', () => {
      const inputValue=parentInput.value.trim().toLowerCase();

      if (inputValue==='yes') {
        fu.style.display = 'block';
      } else {
        fu.style.display = 'none';
        fu.querySelector('input').value = '';
      }
    });
  });
});

// handle followup questions for questions form
let followUpIndex=0;

function toggleFollowUps() {
    const container = document.getElementById('followUpsContainer');
    const checkbox = document.getElementById('hasFollowUp');
    container.style.display = checkbox.checked ? 'block' : 'none';
}

function addFollowUp(){
  const container=document.getElementById("followUpFields");
  const block=document.createElement('div');
  block.classList.add('follow-up-block');
  block.innerHTML=`
    <label class="form-label">Follow-Up Title:</label>
    <input type="text" class="form-control" name="follow_ups[${followUpIndex}][question_title]" required><br><br>
    <label class="form-label">Follow-Up Question</label>
    <input type="text" class="form-control" name="follow_ups[${followUpIndex}][question]" required><br>    
  `
  container.appendChild(block);
  followUpIndex++;
}

