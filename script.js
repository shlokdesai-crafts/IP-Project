document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navigation Highlighting
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });

    // 2. Search Functionality
    const searchInput = document.getElementById('searchInput');
    const tableBody = document.querySelector('#inventoryTable tbody');
    
    if (searchInput && tableBody) {
        searchInput.addEventListener('keyup', function() {
            const filter = this.value.toLowerCase();
            const rows = tableBody.getElementsByTagName('tr');
            
            for (let i = 0; i < rows.length; i++) {
                // Get the first column (Medicine Name)
                const nameCell = rows[i].getElementsByTagName('td')[0];
                if (nameCell) {
                    const textValue = nameCell.textContent || nameCell.innerText;
                    if (textValue.toLowerCase().indexOf(filter) > -1) {
                        rows[i].style.display = ""; // Show row
                    } else {
                        rows[i].style.display = "none"; // Hide row
                    }
                }
            }
        });
    }

    // 3. Add Medicine Form Submission
    const addMedicineForm = document.getElementById('addMedicineForm');
    const successMessage = document.getElementById('successMessage');
    let totalMedicinesCount = 125; // Initial count based on HTML
    
    if (addMedicineForm) {
        addMedicineForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent page reload
            
            // Read values from the form
            const name = document.getElementById('medName').value;
            const category = document.getElementById('medCategory').value;
            const quantity = parseInt(document.getElementById('medQuantity').value);
            const price = document.getElementById('medPrice').value;
            
            // Format the date (basic formatting)
            const rawDate = document.getElementById('medExpiry').value;
            let formattedDate = "";
            if (rawDate) {
                const dateObj = new Date(rawDate);
                const day = String(dateObj.getDate()).padStart(2, '0');
                const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                const year = dateObj.getFullYear();
                formattedDate = `${day}/${month}/${year}`;
            }

            // Determine status and badge class based on quantity
            let statusText = "In Stock";
            let badgeClass = "badge-success";
            
            if (quantity <= 20) {
                statusText = "Low Stock";
                badgeClass = "badge-warning";
            }
            if (quantity === 0) {
                statusText = "Out of Stock";
                badgeClass = "badge-danger";
            }

            // Create new row
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${name}</td>
                <td>${category}</td>
                <td>${quantity}</td>
                <td>${price}</td>
                <td>${formattedDate}</td>
                <td><span class="badge ${badgeClass}">${statusText}</span></td>
            `;
            
            // Add row to the table
            tableBody.appendChild(newRow);
            
            // Update total medicines count
            totalMedicinesCount++;
            document.getElementById('total-medicines').innerText = totalMedicinesCount;

            // Clear the form
            addMedicineForm.reset();
            
            // Show success message temporarily
            successMessage.style.display = "block";
            setTimeout(() => {
                successMessage.style.display = "none";
            }, 3000); // Hide after 3 seconds
        });
    }

});
