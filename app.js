document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Dynamic Seats Countdown Counter
    // ----------------------------------------------------
    const seatsCounterEl = document.getElementById('seats-counter');
    let currentSeats = parseInt(localStorage.getItem('ltwa_remaining_seats')) || 8;
    
    // Set initial seats text
    if (seatsCounterEl) {
        seatsCounterEl.textContent = currentSeats;
    }

    // Dynamic timer to decrease seat count occasionally for urgency
    const decreaseSeatsTimer = () => {
        if (currentSeats > 2) {
            currentSeats--;
            localStorage.setItem('ltwa_remaining_seats', currentSeats);
            if (seatsCounterEl) {
                seatsCounterEl.classList.add('pulse');
                setTimeout(() => seatsCounterEl.classList.remove('pulse'), 500);
                seatsCounterEl.textContent = currentSeats;
            }
        }
        // Random interval between 2 to 5 minutes
        const nextTime = (Math.random() * (300000 - 120000) + 120000);
        setTimeout(decreaseSeatsTimer, nextTime);
    };
    
    // Start countdown timer after 1 minute
    setTimeout(decreaseSeatsTimer, 60000);


    // ----------------------------------------------------
    // 2. Modals Control (Registration & Admin)
    // ----------------------------------------------------
    const regModal = document.getElementById('registration-modal');
    const adminModal = document.getElementById('admin-modal');
    const openFormBtns = document.querySelectorAll('.open-form-btn');
    const closeFormBtn = document.getElementById('close-modal-btn');
    const closeSuccessBtn = document.getElementById('success-close-btn');
    const closeAdminBtn = document.getElementById('close-admin-btn');
    const adminTrigger = document.getElementById('admin-trigger');
    const logoTrigger = document.getElementById('logo-trigger');
    
    // Helper to toggle modal
    const showModal = (modal) => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const hideModal = (modal) => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Open/Close Registration Form
    openFormBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Reset Form and Screens
            document.getElementById('registration-form').style.display = 'flex';
            document.getElementById('success-screen').style.display = 'none';
            showModal(regModal);
        });
    });

    if (closeFormBtn) closeFormBtn.addEventListener('click', () => hideModal(regModal));
    if (closeSuccessBtn) closeSuccessBtn.addEventListener('click', () => hideModal(regModal));

    // Open/Close Admin panel
    if (adminTrigger) {
        adminTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            renderAdminTable();
            showModal(adminModal);
        });
    }
    if (closeAdminBtn) closeAdminBtn.addEventListener('click', () => hideModal(adminModal));

    // Secret shortcut: Triple click logo to open admin dashboard
    let logoClicks = 0;
    if (logoTrigger) {
        logoTrigger.addEventListener('click', (e) => {
            // Only trigger if clicking logo text / icon, prevent default anchor redirect
            e.preventDefault();
            logoClicks++;
            if (logoClicks === 3) {
                logoClicks = 0;
                renderAdminTable();
                showModal(adminModal);
            }
            // Reset clicks after 2 seconds
            setTimeout(() => { logoClicks = 0; }, 2000);
        });
    }

    // Close modal on clicking backdrop overlay
    window.addEventListener('click', (e) => {
        if (e.target === regModal) hideModal(regModal);
        if (e.target === adminModal) hideModal(adminModal);
    });


    // ----------------------------------------------------
    // 3. Curriculum & FAQ Accordions
    // ----------------------------------------------------
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        questionBtn.addEventListener('click', () => {
            // Toggle active state
            const isActive = item.classList.contains('active');
            
            // Close other FAQ items
            faqItems.forEach(otherItem => otherItem.classList.remove('active'));
            
            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });


    // ----------------------------------------------------
    // 4. Testimonials Slider Carousel
    // ----------------------------------------------------
    const track = document.getElementById('carousel-track');
    const slides = Array.from(track ? track.children : []);
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');
    const dotsContainer = document.getElementById('carousel-dots');
    
    let currentIndex = 0;
    let autoplayInterval;

    if (slides.length > 0) {
        // Create dots indicators
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => moveToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = Array.from(dotsContainer.children);

        const moveToSlide = (index) => {
            track.style.transform = `translateX(-${index * 100}%)`;
            dots[currentIndex].classList.remove('active');
            dots[index].classList.add('active');
            currentIndex = index;
            resetAutoplay();
        };

        const showNextSlide = () => {
            let nextIndex = currentIndex + 1;
            if (nextIndex >= slides.length) nextIndex = 0;
            moveToSlide(nextIndex);
        };

        const showPrevSlide = () => {
            let prevIndex = currentIndex - 1;
            if (prevIndex < 0) prevIndex = slides.length - 1;
            moveToSlide(prevIndex);
        };

        if (nextBtn) nextBtn.addEventListener('click', showNextSlide);
        if (prevBtn) prevBtn.addEventListener('click', showPrevSlide);

        // Autoplay logic
        const startAutoplay = () => {
            autoplayInterval = setInterval(showNextSlide, 5000);
        };

        const resetAutoplay = () => {
            clearInterval(autoplayInterval);
            startAutoplay();
        };

        startAutoplay();
    }


    // ----------------------------------------------------
    // 5. Drag & Drop File Upload Handler
    // ----------------------------------------------------
    const dragDropArea = document.getElementById('drag-drop-area');
    const fileInput = document.getElementById('slip-upload');
    const previewContainer = document.getElementById('slip-preview-container');
    const previewImg = document.getElementById('slip-preview-img');
    const removeFileBtn = document.getElementById('btn-remove-file');
    const uploadContent = dragDropArea ? dragDropArea.querySelector('.upload-content') : null;

    let uploadedFileBase64 = '';

    if (dragDropArea && fileInput) {
        // Prevent defaults on drag events
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dragDropArea.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            }, false);
        });

        // Add visual indicator on drag over
        ['dragenter', 'dragover'].forEach(eventName => {
            dragDropArea.addEventListener(eventName, () => {
                dragDropArea.classList.add('dragover');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dragDropArea.addEventListener(eventName, () => {
                dragDropArea.classList.remove('dragover');
            }, false);
        });

        // Handle dropped files
        dragDropArea.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;
            if (files.length > 0) {
                fileInput.files = files;
                handleFileSelect(files[0]);
            }
        });

        // Click area triggers input click
        dragDropArea.addEventListener('click', (e) => {
            // Prevent recursive clicking when fileinput propagates click
            if (e.target !== fileInput && e.target !== removeFileBtn && !removeFileBtn.contains(e.target)) {
                fileInput.click();
            }
        });

        // Handle selected file from input
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                handleFileSelect(e.target.files[0]);
            }
        });

        // Remove selected file
        removeFileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            fileInput.value = '';
            uploadedFileBase64 = '';
            previewContainer.style.display = 'none';
            uploadContent.style.display = 'block';
            fileInput.setAttribute('required', 'required'); // Restore required field
        });
    }

    const handleFileSelect = (file) => {
        if (!file.type.startsWith('image/')) {
            alert('กรุณาเลือกไฟล์ภาพสลิปที่ถูกต้อง (JPG, PNG)');
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            alert('ขนาดไฟล์ต้องไม่เกิน 5MB');
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            uploadedFileBase64 = reader.result;
            previewImg.src = reader.result;
            uploadContent.style.display = 'none';
            previewContainer.style.display = 'flex';
            fileInput.removeAttribute('required'); // Remove required as we have the file data in uploadedFileBase64
        };
    };


    // ----------------------------------------------------
    // 6. Registration Form Submission
    // ----------------------------------------------------
    // 6. Registration Form Submission (Hybrid Cloud + Local Backup)
    // ----------------------------------------------------
    const regForm = document.getElementById('registration-form');
    const successScreen = document.getElementById('success-screen');

    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validate slip upload first
            if (!uploadedFileBase64) {
                alert('กรุณาอัปโหลดรูปภาพสลิปหลักฐานการโอนเงิน');
                return;
            }

            // Gather inputs
            const formData = new FormData(regForm);
            const registration = {
                id: 'REG_' + Date.now(),
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                lineId: formData.get('lineId'),
                country: formData.get('country'),
                learningGoals: formData.get('learningGoals'),
                slipImage: uploadedFileBase64,
                timestamp: new Date().toLocaleString('th-TH')
            };

            // Save local backup helper
            const saveLocalBackup = (isSynced) => {
                const regBackup = { ...registration, synced: isSynced };
                let registrations = JSON.parse(localStorage.getItem('ltwa_submissions')) || [];
                registrations.push(regBackup);
                localStorage.setItem('ltwa_submissions', JSON.stringify(registrations));
            };

            // Toggle loading state on submit button
            const submitBtn = regForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'กำลังส่งข้อมูลสมัครเรียน...';

            if (googleScriptUrl) {
                // Send real POST request to Google Apps Script
                fetch(googleScriptUrl, {
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify(registration)
                })
                .then(response => {
                    // Google Apps Script usually returns 200 or 302.
                    saveLocalBackup(true);
                    showSuccessState();
                })
                .catch(error => {
                    console.error('Submission upload error:', error);
                    // Network issue, save backup locally
                    saveLocalBackup(false);
                    alert('แจ้งเตือน: ไม่สามารถส่งข้อมูลไปคลาวด์ได้ชั่วคราวเนื่องจากปัญหาเครือข่าย แต่ระบบได้บันทึกรายชื่อสำรองในเครื่องนี้แล้ว');
                    showSuccessState();
                });
            } else {
                // Mock local storage mode
                saveLocalBackup(false);
                setTimeout(() => {
                    showSuccessState();
                }, 800); // Small delay to feel realistic
            }

            function showSuccessState() {
                // Subtract 1 seat if registrations is successful and seats > 2
                if (currentSeats > 2) {
                    currentSeats--;
                    localStorage.setItem('ltwa_remaining_seats', currentSeats);
                    if (seatsCounterEl) {
                        seatsCounterEl.textContent = currentSeats;
                    }
                }
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                regForm.style.display = 'none';
                successScreen.style.display = 'flex';
                regForm.reset();
                uploadedFileBase64 = '';
                if (previewContainer) previewContainer.style.display = 'none';
                if (uploadContent) uploadContent.style.display = 'block';
            }
        });
    }


    // ----------------------------------------------------
    // 7. Google Sheets Integration Settings & Status
    // ----------------------------------------------------
    const googleScriptUrlInput = document.getElementById('google-script-url-input');
    const saveScriptUrlBtn = document.getElementById('save-script-url-btn');
    const connectionStatusBadge = document.getElementById('connection-status-badge');

    let googleScriptUrl = localStorage.getItem('ltwa_google_script_url') || 'https://script.google.com/macros/s/AKfycbwgiHizfeFQGnOEMSKSHXEb5vHYQ5PM077Ty9iOxRF_9CXsO24VNKk_SxMpb-6AS_D3cQ/exec';

    const updateConnectionStatus = () => {
        if (googleScriptUrlInput) {
            googleScriptUrlInput.value = googleScriptUrl;
        }
        if (connectionStatusBadge) {
            if (googleScriptUrl) {
                connectionStatusBadge.textContent = 'เชื่อมต่อแล้ว (Live / Google Sheets)';
                connectionStatusBadge.className = 'badge-status badge-live';
            } else {
                connectionStatusBadge.textContent = 'จำลอง (Mock / LocalStorage)';
                connectionStatusBadge.className = 'badge-status badge-mock';
            }
        }
    };

    // Initialize Connection Settings on page load
    updateConnectionStatus();

    // Save Connection Settings
    if (saveScriptUrlBtn && googleScriptUrlInput) {
        saveScriptUrlBtn.addEventListener('click', () => {
            const urlValue = googleScriptUrlInput.value.trim();
            if (urlValue === '') {
                googleScriptUrl = '';
                localStorage.removeItem('ltwa_google_script_url');
                alert('ยกเลิกการเชื่อมต่อเรียบร้อย ระบบกลับไปใช้โหมดจำลองในเครื่อง (Mock Mode)');
                updateConnectionStatus();
            } else {
                if (!urlValue.startsWith('https://script.google.com/macros/')) {
                    alert('รูปแบบลิงก์ของ Google Apps Script Web App ไม่ถูกต้อง (ต้องเริ่มต้นด้วย https://script.google.com/macros/)');
                    return;
                }
                googleScriptUrl = urlValue;
                localStorage.setItem('ltwa_google_script_url', googleScriptUrl);
                alert('บันทึกและเชื่อมต่อฐานข้อมูล Google Sheets สำเร็จ!');
                updateConnectionStatus();
            }
        });
    }


    // ----------------------------------------------------
    // 8. Admin Dashboard Functionality
    // ----------------------------------------------------
    const adminTableBody = document.getElementById('admin-table-body');
    const clearDataBtn = document.getElementById('clear-data-btn');
    const exportCsvBtn = document.getElementById('export-csv-btn');

    const renderAdminTable = () => {
        if (!adminTableBody) return;

        const registrations = JSON.parse(localStorage.getItem('ltwa_submissions')) || [];
        adminTableBody.innerHTML = '';

        if (registrations.length === 0) {
            adminTableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center">ไม่มีข้อมูลผู้สมัครในขณะนี้</td>
                </tr>
            `;
            return;
        }

        registrations.forEach((reg, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>
                    <strong>${reg.firstName} ${reg.lastName}</strong><br>
                    ${reg.synced ? '<span style="font-size:0.75rem; color:#28a745;">☁️ ซิงค์ Google Sheet แล้ว</span>' : '<span style="font-size:0.75rem; color:#e5b230;">💾 บันทึกสำรองในเครื่อง</span>'}
                </td>
                <td>
                    📧 ${reg.email}<br>
                    📞 ${reg.phone}<br>
                    💬 Line: ${reg.lineId}
                </td>
                <td>${reg.country}</td>
                <td style="max-width: 250px; word-wrap: break-word;">${reg.learningGoals}</td>
                <td>
                    <img src="${reg.slipImage}" alt="สลิปหลักฐาน" class="slip-thumbnail" onclick="window.open('${reg.slipImage}')">
                </td>
                <td>${reg.timestamp}</td>
            `;
            adminTableBody.appendChild(tr);
        });
    };

    // Clear data from local storage
    if (clearDataBtn) {
        clearDataBtn.addEventListener('click', () => {
            if (confirm('คุณต้องการล้างข้อมูลรายชื่อสมัครเรียนทั้งหมดใช่หรือไม่? ข้อมูลนี้จะหายไปอย่างถาวร')) {
                localStorage.removeItem('ltwa_submissions');
                renderAdminTable();
            }
        });
    }

    // Export submissions to CSV (with support for UTF-8 Thai language)
    if (exportCsvBtn) {
        exportCsvBtn.addEventListener('click', () => {
            const registrations = JSON.parse(localStorage.getItem('ltwa_submissions')) || [];
            if (registrations.length === 0) {
                alert('ไม่มีข้อมูลสำหรับดาวน์โหลด');
                return;
            }

            // Define CSV headers
            let csvContent = '\uFEFF'; // UTF-8 BOM for MS Excel compatibility
            csvContent += 'ลำดับ,ชื่อ,นามสกุล,อีเมล,เบอร์โทรศัพท์,LINE ID,ประเทศ,เป้าหมายในการเรียน,วันเวลาที่สมัคร,สถานะการซิงค์คลาวด์\n';

            registrations.forEach((reg, index) => {
                // Escape values with double quotes and replace internal quotes
                const row = [
                    index + 1,
                    `"${reg.firstName.replace(/"/g, '""')}"`,
                    `"${reg.lastName.replace(/"/g, '""')}"`,
                    `"${reg.email.replace(/"/g, '""')}"`,
                    `"${reg.phone.replace(/"/g, '""')}"`,
                    `"${reg.lineId.replace(/"/g, '""')}"`,
                    `"${reg.country.replace(/"/g, '""')}"`,
                    `"${reg.learningGoals.replace(/"/g, '""')}"`,
                    `"${reg.timestamp}"`,
                    `"${reg.synced ? 'ซิงค์คลาวด์แล้ว' : 'สำรองในเครื่อง'}"`
                ].join(',');
                csvContent += row + '\n';
            });

            // Trigger file download
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.setAttribute('href', url);
            link.setAttribute('download', `LTWA_Submissions_${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
});
