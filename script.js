// ================================================================
//  DATA LAPORAN DUMMY
// ================================================================
const dummyReports = [
    {
        id: 1,
        nama: 'Aulia Rahman',
        lokasi: 'Jalan Raya 🛣️',
        deskripsi: 'Jalan berlubang besar di depan Pasar Induk, udah 2 minggu gak diperbaiki. Sering bikin motor jatuh, tolong segera ditindak! 😤',
        waktu: '2 jam lalu',
        status: 'baru',
        avatarColor: 'purple',
        likes: 24,
        comments: 7
    },
    {
        id: 2,
        nama: 'Bella Safira',
        lokasi: 'Lampu Jalan 💡',
        deskripsi: 'Lampu penerangan di Gang Mawar mati total sejak seminggu lalu. Jalannya jadi gelap gulita, rawan kejahatan nih! 🔦',
        waktu: '5 jam lalu',
        status: 'diproses',
        avatarColor: 'cyan',
        likes: 18,
        comments: 4
    },
    {
        id: 3,
        nama: 'Dimas Pratama',
        lokasi: 'Saluran Air / Drainase 🌊',
        deskripsi: 'Selokan di depan rumah mampet total, pas hujan air langsung naik ke jalan. Bau juga udah menyengat. Tolong dibersihin! 😷',
        waktu: '8 jam lalu',
        status: 'selesai',
        avatarColor: 'green',
        likes: 31,
        comments: 12
    },
    {
        id: 4,
        nama: 'Nita Kusuma',
        lokasi: 'Taman Kota 🌳',
        deskripsi: 'Bangku taman di Taman Merdeka banyak yang rusak. Tempat duduknya patah, kawatnya berkarat. Bahaya buat anak-anak! 🛑',
        waktu: '1 hari lalu',
        status: 'baru',
        avatarColor: 'pink',
        likes: 15,
        comments: 3
    },
    {
        id: 5,
        nama: 'Rizky Hidayat',
        lokasi: 'Trotoar / Pedestrian 🚶',
        deskripsi: 'Trotoar di sepanjang Jalan Sudirman udah banyak yang retak dan bolong. Jadi susah buat pejalan kaki, apalagi disabilitas.',
        waktu: '1 hari lalu',
        status: 'diproses',
        avatarColor: 'yellow',
        likes: 22,
        comments: 8
    },
    {
        id: 6,
        nama: 'Sari Wijaya',
        lokasi: 'Fasilitas Sekolah 🏫',
        deskripsi: 'Atap ruang kelas SDN 03 bocor parah kalo hujan. Anak-anak belajar sambil pindah-pindah tempat. Kasian banget 😢',
        waktu: '2 hari lalu',
        status: 'selesai',
        avatarColor: 'orange',
        likes: 45,
        comments: 19
    }
];

// ================================================================
//  RENDER DUMMY REPORTS
// ================================================================
function renderReports() {
    const grid = document.getElementById('reportsGrid');
    grid.innerHTML = dummyReports.map(report => `
        <div class="report-card status-${report.status} fade-in">
            <div class="card-top">
                <div class="card-avatar ${report.avatarColor}">
                    ${report.nama.charAt(0)}
                </div>
                <span class="card-status ${report.status}">
                    ${report.status === 'baru' ? '🆕 Baru' : report.status === 'diproses' ? '⏳ Diproses' : '✅ Selesai'}
                </span>
            </div>
            <div class="card-name">${report.nama}</div>
            <div class="card-location">📍 ${report.lokasi}</div>
            <p class="card-desc">${report.deskripsi}</p>
            <div class="card-footer">
                <span>🕐 ${report.waktu}</span>
                <div class="reactions">
                    <span>👍 ${report.likes}</span>
                    <span>💬 ${report.comments}</span>
                </div>
            </div>
        </div>
    `).join('');

    // Trigger fade-in animations
    requestAnimationFrame(() => {
        document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
    });
}

// ================================================================
//  TOAST NOTIFICATION SYSTEM
// ================================================================
function showToast(type, title, message, duration = 4500) {
    const container = document.getElementById('toastContainer');
    const icons = {
        success: '✅',
        error: '❌'
    };

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-icon ${type}">${icons[type] || '✅'}</div>
        <div class="toast-body">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">✕</button>
    `;

    container.appendChild(toast);

    // Trigger masuk
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    // Auto remove
    const timeout = setTimeout(() => {
        removeToast(toast);
    }, duration);

    // Kalo user klik close
    toast.querySelector('.toast-close').addEventListener('click', () => {
        clearTimeout(timeout);
        removeToast(toast);
    });
}

function removeToast(toast) {
    toast.classList.remove('show');
    toast.classList.add('hide');
    setTimeout(() => {
        if (toast.parentElement) toast.remove();
    }, 400);
}

// ================================================================
//  FORM HANDLING
// ================================================================
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('complaintForm');
    const submitBtn = document.getElementById('submitBtn');
    const namaInput = document.getElementById('nama');
    const lokasiSelect = document.getElementById('lokasi');
    const deskripsiTextarea = document.getElementById('deskripsi');
    const fotoInput = document.getElementById('foto');
    const fileNameDisplay = document.getElementById('fileName');

    // Tampilkan nama file yang dipilih
    fotoInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            fileNameDisplay.textContent = `📎 ${this.files[0].name}`;
        } else {
            fileNameDisplay.textContent = '';
        }
    });

    // Validasi form
    function validateField(input, errorId) {
        const errorEl = document.getElementById(errorId);
        if (!input.value || (input.tagName === 'SELECT' && !input.value)) {
            input.classList.add('error');
            errorEl.classList.add('visible');
            return false;
        } else {
            input.classList.remove('error');
            errorEl.classList.remove('visible');
            return true;
        }
    }

    // Hapus error state saat user mulai ngetik
    namaInput.addEventListener('input', () => validateField(namaInput, 'namaError'));
    lokasiSelect.addEventListener('change', () => validateField(lokasiSelect, 'lokasiError'));
    deskripsiTextarea.addEventListener('input', () => validateField(deskripsiTextarea, 'deskripsiError'));

    // Submit handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validasi semua field wajib
        const isNamaValid = validateField(namaInput, 'namaError');
        const isLokasiValid = validateField(lokasiSelect, 'lokasiError');
        const isDeskripsiValid = validateField(deskripsiTextarea, 'deskripsiError');

        if (!isNamaValid || !isLokasiValid || !isDeskripsiValid) {
            showToast('error', 'Oops! Ada yang kurang 😅', 'Lengkapin dulu field yang wajib diisi ya!');
            // Scroll ke form
            document.getElementById('formSection').scrollIntoView({ behavior: 'smooth' });
            return;
        }

        // Loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Simulasi kirim (2 detik)
        setTimeout(() => {
            // Reset loading
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;

            // Tampilkan toast sukses
            showToast(
                'success',
                'Laporan Terkirim! 🎉',
                'Makasih udah lapor! Tim kami bakal langsung proses laporan kamu. Pantau terus statusnya ya! 🙌'
            );

            // Reset form
            form.reset();
            fileNameDisplay.textContent = '';

            // Hapus semua error state
            [namaInput, lokasiSelect, deskripsiTextarea].forEach(el => {
                el.classList.remove('error');
            });
            document.querySelectorAll('.error-message').forEach(el => {
                el.classList.remove('visible');
            });

            // Kalo user ada di mobile, scroll ke atas dikit biar liat toast
            if (window.innerWidth <= 768) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }, 2000);
    });

    // ============================================================
    //  NAVBAR
    // ============================================================
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('navLinks');

    burger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Tutup menu kalo link diklik (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            burger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active nav link berdasarkan scroll position
        const sections = ['hero', 'formSection', 'reportsSection'];
        let activeSection = 'hero';

        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                const rect = el.getBoundingClientRect();
                if (rect.top <= 150) {
                    activeSection = id;
                }
            }
        });

        navLinks.querySelectorAll('a:not(.btn-lapor-nav)').forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${activeSection}`) {
                link.classList.add('active');
            }
        });

        lastScroll = currentScroll;
    });

    // ============================================================
    //  INIT
    // ============================================================
    renderReports();

    // Fade-in untuk section header
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-header').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    document.querySelectorAll('.form-wrapper').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});