// Admin Dashboard JavaScript
class AdminDashboard {
    constructor() {
        this.initializePage();
        this.loadDashboardData();
        this.initializeCharts();
    }

    initializePage() {
        // Set current date
        document.getElementById('currentDate').textContent = new Date().toLocaleDateString();
        
        // Initialize section navigation
        this.showSection('dashboard');
    }

    loadDashboardData() {
        // Load mock data for dashboard
        this.loadManagersData();
        this.updateStatistics();
    }

    loadManagersData() {
        const managersData = [
            {
                id: 'BM001',
                name: 'John Smith',
                email: 'john.smith@finsphere.com',
                branch: 'Mumbai Central',
                status: 'Active',
                applications: 23,
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=50&h=50&fit=crop&crop=face'
            },
            {
                id: 'BM002',
                name: 'Sarah Johnson',
                email: 'sarah.johnson@finsphere.com',
                branch: 'Delhi North',
                status: 'Active',
                applications: 18,
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c5?ixlib=rb-4.0.3&w=50&h=50&fit=crop&crop=face'
            },
            {
                id: 'BM003',
                name: 'Michael Chen',
                email: 'michael.chen@finsphere.com',
                branch: 'Bangalore South',
                status: 'Active',
                applications: 31,
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=50&h=50&fit=crop&crop=face'
            }
        ];

        const tableBody = document.getElementById('managersTable');
        if (tableBody) {
            tableBody.innerHTML = managersData.map(manager => `
                <tr>
                    <td>${manager.id}</td>
                    <td>
                        <div class="d-flex align-items-center">
                            <img src="${manager.avatar}" 
                                 class="rounded-circle me-2" width="40" height="40" alt="Manager">
                            <div>
                                <strong>${manager.name}</strong>
                                <br><small class="text-muted">Senior Manager</small>
                            </div>
                        </div>
                    </td>
                    <td>${manager.email}</td>
                    <td>${manager.branch}</td>
                    <td><span class="badge bg-success">${manager.status}</span></td>
                    <td>${manager.applications} pending</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary" onclick="editManager('${manager.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="toggleManagerStatus('${manager.id}')">
                            <i class="fas fa-ban"></i>
                        </button>
                    </td>
                </tr>
            `).join('');
        }
    }

    updateStatistics() {
        // Update dashboard statistics with mock data
        const stats = {
            totalApplications: 156,
            activeManagers: 12,
            pendingReviews: 89,
            feedbackReports: 43
        };

        // These would typically be updated with real data from an API
        console.log('Dashboard statistics updated:', stats);
    }

    initializeCharts() {
        this.createApplicationsChart();
        this.createLoanTypesChart();
        this.createPerformanceChart();
    }

    createApplicationsChart() {
        const ctx = document.getElementById('applicationsChart');
        if (ctx) {
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Applications',
                        data: [65, 78, 66, 85, 92, 89],
                        borderColor: '#4285f4',
                        backgroundColor: 'rgba(66, 133, 244, 0.1)',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }

    createLoanTypesChart() {
        const ctx = document.getElementById('loanTypesChart');
        if (ctx) {
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Personal', 'Home', 'Vehicle', 'Education'],
                    datasets: [{
                        data: [45, 25, 20, 10],
                        backgroundColor: [
                            '#4285f4',
                            '#34a853',
                            '#fbbc04',
                            '#ea4335'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }
    }

    createPerformanceChart() {
        const ctx = document.getElementById('performanceChart');
        if (ctx) {
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Approved',
                        data: [45, 52, 48, 61, 65, 58],
                        backgroundColor: '#34a853'
                    }, {
                        label: 'Rejected',
                        data: [12, 15, 18, 14, 12, 16],
                        backgroundColor: '#ea4335'
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }

    showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });

        // Show selected section
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.add('active');
        }

        // Update sidebar navigation
        document.querySelectorAll('.sidebar-link').forEach(link => {
            link.classList.remove('active');
        });

        const activeLink = document.querySelector(`[onclick="showSection('${sectionId}')"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

// Manager Management Functions
function addManager() {
    const name = document.getElementById('managerName').value;
    const email = document.getElementById('managerEmail').value;
    const phone = document.getElementById('managerPhone').value;
    const branch = document.getElementById('managerBranch').value;

    if (!name || !email || !phone || !branch) {
        alert('Please fill in all fields');
        return;
    }

    // Simulate adding manager
    console.log('Adding manager:', { name, email, phone, branch });
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('addManagerModal'));
    modal.hide();

    // Clear form
    document.getElementById('addManagerForm').reset();

    // Show success message
    showAlert('Branch Manager added successfully!', 'success');

    // Refresh the managers table
    setTimeout(() => {
        location.reload();
    }, 2000);
}

function editManager(managerId) {
    console.log('Editing manager:', managerId);
    // This would typically open an edit modal with pre-filled data
    alert(`Edit manager ${managerId} functionality would be implemented here`);
}

function toggleManagerStatus(managerId) {
    if (confirm('Are you sure you want to toggle this manager\'s status?')) {
        console.log('Toggling status for manager:', managerId);
        // This would typically make an API call to update the status
        showAlert('Manager status updated successfully!', 'success');
    }
}

// Feature Management Functions
function toggleFeature(featureId) {
    const checkbox = document.getElementById(featureId);
    const status = checkbox.checked ? 'enabled' : 'disabled';
    
    console.log(`Feature ${featureId} ${status}`);
    showAlert(`Feature ${status} successfully!`, 'success');
}

// Utility Functions
function showSection(sectionId) {
    window.adminDashboard.showSection(sectionId);
}

function showAlert(message, type) {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alert.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px;';
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(alert);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alert && alert.parentNode) {
            alert.remove();
        }
    }, 5000);
}

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', function() {
    window.adminDashboard = new AdminDashboard();
    
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// Handle window resize for charts
window.addEventListener('resize', function() {
    Chart.helpers.each(Chart.instances, function(instance) {
        instance.resize();
    });
});