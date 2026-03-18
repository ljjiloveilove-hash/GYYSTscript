// 纯JS版本的面板创建函数
function createSettingsPanel() {

    // 2. 创建主容器
    const panel = document.createElement('div');
    panel.id = scriptId;
    panel.className = 'inline-drawer';  // 使用SillyTavern的样式类
    
    // 3. 设置面板HTML结构（模仿MVU）
    panel.innerHTML = `
        <div class="inline-drawer-toggle inline-drawer-header">
            <b>我的MVU风格面板</b>
            <div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div>
        </div>
        <div class="inline-drawer-content">
            <!-- 版本信息 -->
            <div class="mvu-section">
                <div class="mvu-section__title">
                    <strong>当前版本</strong>
                </div>
                <div class="mvu-section__content">
                    <span>1.0.0 (2024-01-01)</span>
                </div>
            </div>
            
            <!-- 开关选项 -->
            <div class="mvu-section">
                <div class="mvu-section__title">
                    <strong>基本设置</strong>
                </div>
                <div class="mvu-section__content">
                    <label class="checkbox_label">
                        <input type="checkbox" id="feature-enable"> 启用功能
                    </label>
                </div>
            </div>
            
            <!-- 输入框 -->
            <div class="mvu-field">
                <label class="mvu-field__label">
                    <span>API地址</span>
                </label>
                <input type="text" id="api-url" class="text_pole" 
                       placeholder="http://localhost:8080">
            </div>
            
            <!-- 带帮助图标的选项 -->
            <div class="mvu-field">
                <label class="mvu-field__label">
                    <span>重试次数</span>
                    <i class="fa-solid fa-circle-question fa-sm note-link-span mvu-help-icon" 
                       onclick="alert('设置请求失败后的重试次数')"></i>
                </label>
                <input type="number" id="retry-count" class="text_pole" 
                       min="1" max="10" value="3">
            </div>
        </div>
    `;
    
    // 4. 添加折叠功能
    const header = panel.querySelector('.inline-drawer-header');
    const content = panel.querySelector('.inline-drawer-content');
    const icon = header.querySelector('.inline-drawer-icon');
    
    header.addEventListener('click', () => {
        content.style.display = content.style.display === 'none' ? 'block' : 'none';
        icon.style.transform = content.style.display === 'none' ? 'rotate(-90deg)' : '';
    });
    
    // 5. 挂载到SillyTavern的扩展区域
    const target = document.querySelector('#extensions_settings2, #extensions_settings');
    if (target) {
        target.appendChild(panel);
        console.log('wssb');
    }
    
