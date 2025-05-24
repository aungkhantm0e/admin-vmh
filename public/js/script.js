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

// Chart JS
const chartData=window.chartData || []

const labels=chartData.map(d=>`${d.name}`);
const values=chartData.map(d=> d.responseCount);

const chartElement = document.getElementById('patientChart')

if(chartElement){
  const ctx=chartElement.getContext('2d');
    const patientChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Response Count',
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

        // Patient List
        const patients = [
            { name: 'Alice Smith', age: 28, condition: 'Flu', lastVisit: '2024-05-15' },
            { name: 'John Doe', age: 45, condition: 'Hypertension', lastVisit: '2024-05-10' },
            { name: 'Mary Johnson', age: 52, condition: 'Diabetes', lastVisit: '2024-05-01' },
          ];
      
          const patientList = document.getElementById("patientList");
      
          if(patientList){
            patients.forEach(p => {
              const row = `<tr>
                <td>${p.name}</td>
                <td>${p.age}</td>
                <td>${p.condition}</td>
                <td>${p.lastVisit}</td>
              </tr>`;
              patientList.innerHTML += row;
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
    <label class="form-label">Follow-Up Question</label>
    <input type="text" class="form-control" name="follow_ups[${followUpIndex}][question]" required><br>
    <label class="form-label">Follow-Up Title (key):</label>
    <input type="text" class="form-control" name="follow_ups[${followUpIndex}][question_title]" required><br><br>
  `
  container.appendChild(block);
  followUpIndex++;
}

