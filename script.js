// ==================== 脚本基本信息 ====================
const SCRIPT_NAME = '我的第一个配置脚本';
const SCRIPT_VERSION = '1.0.0';
const STORAGE_KEY = 'my_first_script_settings';

// ==================== 默认配置 ====================
const defaultSettings = {
    enabled: true,
    apiUrl: 'http://localhost:8080',
    retryCount: 3,
    theme: 'light'
};

// ==================== 配置管理 ====================
function loadSettings() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? { ...defaultSettings, ...JSON.parse(saved) } : { ...defaultSettings };
    } catch (e) {
        console.error('加载配置失败:', e);
        return { ...defaultSettings };
    }
}

function saveSettings(settings) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        console.log('配置已保存', settings);
        return true;
    } catch (e) {
        console.error('保存配置失败:', e);
        return false;
    }
}

// ==================== 创建配置界面 ====================
function createSettingsPanel() {
    // 检查是否已经存在，避免重复插入
    if (document.getElementById('my-first-script-panel')) {
        return;
    }

    // 加载当前配置
    const settings = loadSettings();

    // 创建面板容器
    const panel = document.createElement('div');
    panel.id = 'my-first-script-panel';
    panel.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        width: 300px;
        background: white;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 9999;
        font-family: system-ui, -apple-system, sans-serif;
    `;

    // 设置内部HTML
    panel.innerHTML = `
        <div style="padding: 12px 16px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; background: #f5f5f5; border-radius: 8px 8px 0 0;">
            <strong>${SCRIPT_NAME} v${SCRIPT_VERSION}</strong>
            <button id="my-script-toggle" style="background: none; border: none; cursor: pointer; font-size: 16px;">−</button>
        </div>
        <div id="my-script-content" style="padding: 16px;">
            <!-- 开关选项 -->
            <div style="margin-bottom: 12px; display: flex; align-items: center;">
                <input type="checkbox" id="my-enabled" ${settings.enabled ? 'checked' : ''} style="margin-right: 8px;">
                <label for="my-enabled">启用脚本功能</label>
            </div>
            
            <!-- API地址输入 -->
            <div style="margin-bottom: 12px;">
                <label for="my-api-url" style="display: block; margin-bottom: 4px; font-size: 0.9em;">API地址：</label>
                <input type="url" id="my-api-url" value="${settings.apiUrl}" 
                    style="width: 100%; padding: 6px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;">
            </div>
            
            <!-- 重试次数 -->
            <div style="margin-bottom: 12px;">
                <label for="my-retry" style="display: block; margin-bottom: 4px; font-size: 0.9em;">重试次数：</label>
                <input type="number" id="my-retry" min="1" max="10" value="${settings.retryCount}" 
                    style="width: 100%; padding: 6px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;">
            </div>
            
            <!-- 主题选择 -->
            <div style="margin-bottom: 16px;">
                <label for="my-theme" style="display: block; margin-bottom: 4px; font-size: 0.9em;">主题：</label>
                <select id="my-theme" style="width: 100%; padding: 6px; border: 1px solid #ddd; border-radius: 4px;">
                    <option value="light" ${settings.theme === 'light' ? 'selected' : ''}>浅色</option>
                    <option value="dark" ${settings.theme === 'dark' ? 'selected' : ''}>深色</option>
                    <option value="auto" ${settings.theme === 'auto' ? 'selected' : ''}>跟随系统</option>
                </select>
            </div>
            
            <!-- 状态显示 -->
            <div id="my-script-status" style="font-size: 0.85em; color: #666; min-height: 20px;"></div>
            
            <!-- 操作按钮 -->
            <div style="display: flex; gap: 8px; margin-top: 12px;">
                <button id="my-save-btn" style="flex: 1; padding: 6px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">保存配置</button>
                <button id="my-reset-btn" style="flex: 1; padding: 6px; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer;">恢复默认</button>
            </div>
        </div>
    `;

    // 添加到页面
    document.body.appendChild(panel);

    // ==================== 事件绑定 ====================
    const content = document.getElementById('my-script-content');
    const toggleBtn = document.getElementById('my-script-toggle');
    const statusDiv = document.getElementById('my-script-status');

    // 折叠/展开功能
    let isExpanded = true;
    toggleBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;
        content.style.display = isExpanded ? 'block' : 'none';
        toggleBtn.textContent = isExpanded ? '−' : '+';
    });

    // 从UI获取当前配置
    function getCurrentUIState() {
        return {
            enabled: document.getElementById('my-enabled').checked,
            apiUrl: document.getElementById('my-api-url').value,
            retryCount: parseInt(document.getElementById('my-retry').value) || defaultSettings.retryCount,
            theme: document.getElementById('my-theme').value
        };
    }

    // 更新UI显示状态
    function updateStatus(message, isSuccess = true) {
        statusDiv.textContent = message;
        statusDiv.style.color = isSuccess ? '#4CAF50' : '#f44336';
        setTimeout(() => {
            statusDiv.textContent = '';
        }, 3000);
    }

    // 保存按钮
    document.getElementById('my-save-btn').addEventListener('click', () => {
        const newSettings = getCurrentUIState();
        if (saveSettings(newSettings)) {
            updateStatus('✅ 配置保存成功！');
        } else {
            updateStatus('❌ 保存失败', false);
        }
    });

    // 重置按钮
    document.getElementById('my-reset-btn').addEventListener('click', () => {
        document.getElementById('my-enabled').checked = defaultSettings.enabled;
        document.getElementById('my-api-url').value = defaultSettings.apiUrl;
        document.getElementById('my-retry').value = defaultSettings.retryCount;
        document.getElementById('my-theme').value = defaultSettings.theme;
        
        saveSettings(defaultSettings);
        updateStatus('✅ 已恢复默认配置');
    });

    // 实时自动保存（可选，如果开启则每次修改自动保存）
    let autoSaveTimer;
    ['my-enabled', 'my-api-url', 'my-retry', 'my-theme'].forEach(id => {
        document.getElementById(id).addEventListener('input', () => {
            clearTimeout(autoSaveTimer);
            autoSaveTimer = setTimeout(() => {
                const newSettings = getCurrentUIState();
                saveSettings(newSettings);
                updateStatus('💾 已自动保存');
            }, 500);
        });
    });

    console.log(`${SCRIPT_NAME} 配置面板已创建`);
}

// ==================== 脚本初始化 ====================
function initScript() {
    console.log(`🚀 ${SCRIPT_NAME} v${SCRIPT_VERSION} 正在启动...`);
    
    // 等待DOM加载完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createSettingsPanel);
    } else {
        createSettingsPanel();
    }
    
    // 导出API供其他脚本使用（可选）
    window.MyFirstScript = {
        version: SCRIPT_VERSION,
        loadSettings,
        saveSettings,
        getSettings: loadSettings
    };
    
    console.log(`✅ ${SCRIPT_NAME} 初始化完成`);
}

// 启动脚本
initScript();