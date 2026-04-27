// supabase-config.js
// Единая конфигурация Supabase для всех страниц
(function() {
    const SUPABASE_CONFIG = {
        url: 'https://owagntywpiymqhbfoxye.supabase.co',
        key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93YWdudHl3cGl5bXFoYmZveHllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzMTg5MDUsImV4cCI6MjA5MTg5NDkwNX0.p-3xAhbFgH5lcGnbBfkcQQFVza_Yc2qoY6VBlhmmFGg',
        bucket: 'reports'
    };

    // Глобальные утилиты
    window.LamGroupDB = {
        getClient: function() {
            return window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.key);
        },
        
        escapeHtml: function(text) {
            if (!text) return '';
            return String(text).replace(/[&<>"']/g, function(m) {
                return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m] || m;
            });
        },
        
        formatDate: function(dateStr) {
            if (!dateStr) return '—';
            return new Date(dateStr).toLocaleDateString('ru-RU', {day:'numeric', month:'long', year:'numeric'});
        },
        
        formatDateShort: function(dateStr) {
            if (!dateStr) return '—';
            return new Date(dateStr).toLocaleDateString('ru-RU');
        },
        
        formatMoney: function(amount) {
            return (amount || 0).toLocaleString() + ' ₸';
        },
        
        showMessage: function(text, type, duration) {
            duration = duration || 3000;
            var msg = document.getElementById('global-message');
            if (!msg) {
                msg = document.createElement('div');
                msg.id = 'global-message';
                msg.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);z-index:99999;padding:14px 24px;border-radius:14px;font-weight:600;font-size:14px;max-width:90%;text-align:center;transition:all 0.3s ease;opacity:0;';
                document.body.appendChild(msg);
            }
            msg.textContent = text;
            msg.className = '';
            if (type === 'success') msg.style.cssText = msg.style.cssText.replace(/opacity:.*?;/,'opacity:1;') + 'background:#D1FAE5;color:#065F46;border:2px solid #A7F3D0;';
            else if (type === 'error') msg.style.cssText = msg.style.cssText.replace(/opacity:.*?;/,'opacity:1;') + 'background:#FEE2E2;color:#991B1B;border:2px solid #FECACA;';
            else msg.style.cssText = msg.style.cssText.replace(/opacity:.*?;/,'opacity:1;') + 'background:#DBEAFE;color:#1E40AF;border:2px solid #BFDBFE;';
            setTimeout(function() { msg.style.opacity = '0'; }, duration);
        },
        
        // Единые статусы
        STATUS_MAP: {
            project: {
                'preparation': '📋 Подготовка',
                'mobilization': '🚚 Мобилизация',
                'in_progress': '🔨 В работе',
                'completed': '✅ Завершён',
                'paused': '⏸️ Пауза'
            },
            work_order: {
                'draft': '📝 Черновик',
                'pending_foreman': '⏳ Ждёт бригадира',
                'pending_manager': '⏳ На проверке',
                'approved': '✅ Утверждён',
                'paid': '💰 Выплачен',
                'rejected': '❌ Отклонён'
            },
            expense: {
                'pending': '⏳ Ожидает',
                'approved': '✅ Утверждён',
                'paid': '💰 Оплачен'
            },
            task: {
                'pending': '⏳ Ожидается',
                'in_progress': '🔵 В работе',
                'completed': '✅ Сделано'
            }
        }
    };
})();