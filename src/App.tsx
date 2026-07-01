import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Category, ChecklistItem } from './types';

// ─── 默认待产包数据 ─────────────────────────────────────────────────────────

const DEFAULT_CATEGORIES: Category[] = [
  {
    id: 'docs',
    name: '证件资料',
    emoji: '📋',
    items: [
      { id: uuidv4(), categoryId: 'docs', name: '夫妻双方身份证', quantity: 1, checked: false, note: '', sort_order: 0 },
      { id: uuidv4(), categoryId: 'docs', name: '户口本', quantity: 1, checked: false, note: '', sort_order: 1 },
      { id: uuidv4(), categoryId: 'docs', name: '结婚证', quantity: 1, checked: false, note: '', sort_order: 2 },
      { id: uuidv4(), categoryId: 'docs', name: '准生证/生育登记证明', quantity: 1, checked: false, note: '', sort_order: 3 },
      { id: uuidv4(), categoryId: 'docs', name: '产检手册/孕产妇保健手册', quantity: 1, checked: false, note: '', sort_order: 4 },
      { id: uuidv4(), categoryId: 'docs', name: '医保卡/社保卡', quantity: 1, checked: false, note: '', sort_order: 5 },
      { id: uuidv4(), categoryId: 'docs', name: '银行卡/现金', quantity: 1, checked: false, note: '备用', sort_order: 6 },
    ],
  },
  {
    id: 'maternal',
    name: '妈妈待产用品',
    emoji: '🤰',
    items: [
      { id: uuidv4(), categoryId: 'maternal', name: '哺乳睡衣', quantity: 2, checked: false, note: '前开扣式', sort_order: 0 },
      { id: uuidv4(), categoryId: 'maternal', name: '一次性内裤', quantity: 10, checked: false, note: '', sort_order: 1 },
      { id: uuidv4(), categoryId: 'maternal', name: '产褥垫', quantity: 10, checked: false, note: '60x90cm', sort_order: 2 },
      { id: uuidv4(), categoryId: 'maternal', name: '产妇卫生巾', quantity: 2, checked: false, note: '加大号', sort_order: 3 },
      { id: uuidv4(), categoryId: 'maternal', name: '防溢乳垫', quantity: 1, checked: false, note: '', sort_order: 4 },
      { id: uuidv4(), categoryId: 'maternal', name: '乳头膏/羊脂膏', quantity: 1, checked: false, note: '缓解皲裂', sort_order: 5 },
      { id: uuidv4(), categoryId: 'maternal', name: '吸奶器', quantity: 1, checked: false, note: '', sort_order: 6 },
      { id: uuidv4(), categoryId: 'maternal', name: '月子鞋/棉拖鞋', quantity: 1, checked: false, note: '包跟款', sort_order: 7 },
      { id: uuidv4(), categoryId: 'maternal', name: '束腹带', quantity: 1, checked: false, note: '', sort_order: 8 },
    ],
  },
  {
    id: 'baby',
    name: '宝宝用品',
    emoji: '👶',
    items: [
      { id: uuidv4(), categoryId: 'baby', name: '新生儿连体衣', quantity: 3, checked: false, note: '52码', sort_order: 0 },
      { id: uuidv4(), categoryId: 'baby', name: '婴儿包被', quantity: 2, checked: false, note: '', sort_order: 1 },
      { id: uuidv4(), categoryId: 'baby', name: 'NB码纸尿裤', quantity: 1, checked: false, note: '约30片装', sort_order: 2 },
      { id: uuidv4(), categoryId: 'baby', name: '婴儿湿巾', quantity: 2, checked: false, note: '无香型', sort_order: 3 },
      { id: uuidv4(), categoryId: 'baby', name: '奶瓶', quantity: 2, checked: false, note: '150ml', sort_order: 4 },
      { id: uuidv4(), categoryId: 'baby', name: '奶瓶刷', quantity: 1, checked: false, note: '', sort_order: 5 },
      { id: uuidv4(), categoryId: 'baby', name: '婴儿小毛巾/纱布', quantity: 5, checked: false, note: '', sort_order: 6 },
      { id: uuidv4(), categoryId: 'baby', name: '婴儿帽', quantity: 2, checked: false, note: '', sort_order: 7 },
      { id: uuidv4(), categoryId: 'baby', name: '婴儿手套/脚套', quantity: 2, checked: false, note: '', sort_order: 8 },
      { id: uuidv4(), categoryId: 'baby', name: '婴儿浴盆', quantity: 1, checked: false, note: '可折叠款', sort_order: 9 },
    ],
  },
  {
    id: 'postpartum',
    name: '产后护理',
    emoji: '💊',
    items: [
      { id: uuidv4(), categoryId: 'postpartum', name: '一次性马桶垫', quantity: 1, checked: false, note: '', sort_order: 0 },
      { id: uuidv4(), categoryId: 'postpartum', name: '会阴冲洗器', quantity: 1, checked: false, note: '', sort_order: 1 },
      { id: uuidv4(), categoryId: 'postpartum', name: '漱口水/软毛牙刷', quantity: 1, checked: false, note: '', sort_order: 2 },
      { id: uuidv4(), categoryId: 'postpartum', name: '梳子/镜子', quantity: 1, checked: false, note: '', sort_order: 3 },
      { id: uuidv4(), categoryId: 'postpartum', name: '护肤品', quantity: 1, checked: false, note: '基础保湿', sort_order: 4 },
      { id: uuidv4(), categoryId: 'postpartum', name: '卫生纸/抽纸', quantity: 3, checked: false, note: '', sort_order: 5 },
    ],
  },
  {
    id: 'food',
    name: '食品饮料',
    emoji: '🍫',
    items: [
      { id: uuidv4(), categoryId: 'food', name: '吸管杯/弯头吸管', quantity: 1, checked: false, note: '躺着喝水用', sort_order: 0 },
      { id: uuidv4(), categoryId: 'food', name: '巧克力/能量棒', quantity: 2, checked: false, note: '分娩补充体力', sort_order: 1 },
      { id: uuidv4(), categoryId: 'food', name: '保温杯', quantity: 1, checked: false, note: '', sort_order: 2 },
      { id: uuidv4(), categoryId: 'food', name: '红糖', quantity: 1, checked: false, note: '', sort_order: 3 },
    ],
  },
  {
    id: 'daily',
    name: '日常用品',
    emoji: '🧴',
    items: [
      { id: uuidv4(), categoryId: 'daily', name: '手机+充电器', quantity: 1, checked: false, note: '', sort_order: 0 },
      { id: uuidv4(), categoryId: 'daily', name: '充电宝', quantity: 1, checked: false, note: '', sort_order: 1 },
      { id: uuidv4(), categoryId: 'daily', name: '毛巾/浴巾', quantity: 2, checked: false, note: '', sort_order: 2 },
      { id: uuidv4(), categoryId: 'daily', name: '衣架', quantity: 3, checked: false, note: '', sort_order: 3 },
      { id: uuidv4(), categoryId: 'daily', name: '垃圾袋', quantity: 1, checked: false, note: '', sort_order: 4 },
      { id: uuidv4(), categoryId: 'daily', name: '餐具（筷子/勺子）', quantity: 1, checked: false, note: '', sort_order: 5 },
    ],
  },
];

// ─── localStorage 工具函数 ─────────────────────────────────────────────────────

const STORAGE_KEY = 'hospital-bag-';

function saveToStorage(listId: string, categories: Category[]) {
  try {
    localStorage.setItem(`${STORAGE_KEY}${listId}`, JSON.stringify(categories));
  } catch { /* ignore quota errors */ }
}

function loadFromStorage(listId: string): Category[] | null {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY}${listId}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// ─── 分享文本生成 ──────────────────────────────────────────────────────────────

function generateShareText(categories: Category[]): string {
  const totalItems = categories.reduce((s, c) => s + c.items.length, 0);
  const checkedItems = categories.reduce((s, c) => s + c.items.filter(i => i.checked).length, 0);
  const pct = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;

  let text = `🧸 待产包清单（已完成 ${pct}%，${checkedItems}/${totalItems}）\n`;
  text += `${'─'.repeat(30)}\n\n`;

  categories.forEach(cat => {
    const catChecked = cat.items.filter(i => i.checked).length;
    text += `${cat.emoji} ${cat.name}（${catChecked}/${cat.items.length}）\n`;
    cat.items.forEach(item => {
      const mark = item.checked ? '✅' : '⬜';
      const qty = item.quantity > 1 ? ` x${item.quantity}` : '';
      const note = item.note ? `（${item.note}）` : '';
      text += `  ${mark} ${item.name}${qty}${note}\n`;
    });
    text += '\n';
  });

  return text;
}

// ─── 主组件 ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [listId, setListId] = useState<string>('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showAddCatForm, setShowAddCatForm] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatEmoji, setNewCatEmoji] = useState('📦');
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingNote, setEditingNote] = useState('');

  // ─── 初始化 ──────────────────────────────────────────────────────────────────

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let id = params.get('list');

    if (!id) {
      id = uuidv4().slice(0, 8);
      const url = new URL(window.location.href);
      url.searchParams.set('list', id);
      window.history.replaceState({}, '', url.toString());
    }

    setListId(id);

    const stored = loadFromStorage(id);
    setCategories(stored || DEFAULT_CATEGORIES);
  }, []);

  // ─── 自动保存 ─────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (listId && categories.length > 0) {
      saveToStorage(listId, categories);
    }
  }, [categories, listId]);

  // ─── 操作函数 ─────────────────────────────────────────────────────────────────

  const toggleItem = (categoryId: string, itemId: string) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, items: cat.items.map(item =>
              item.id === itemId ? { ...item, checked: !item.checked } : item
            )}
          : cat
      )
    );
  };

  const updateQuantity = (categoryId: string, itemId: string, delta: number) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, items: cat.items.map(item =>
              item.id === itemId
                ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                : item
            )}
          : cat
      )
    );
  };

  const deleteItem = (categoryId: string, itemId: string) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, items: cat.items.filter(item => item.id !== itemId) }
          : cat
      )
    );
  };

  const addItem = (categoryId: string, name: string) => {
    if (!name.trim()) return;
    const newItem: ChecklistItem = {
      id: uuidv4(),
      categoryId,
      name: name.trim(),
      quantity: 1,
      checked: false,
      note: '',
      sort_order: Date.now(),
    };
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, items: [...cat.items, newItem] }
          : cat
      )
    );
  };

  const saveNote = (categoryId: string, itemId: string, note: string) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, items: cat.items.map(item =>
              item.id === itemId ? { ...item, note } : item
            )}
          : cat
      )
    );
    setEditingItemId(null);
  };

  const addCategory = () => {
    if (!newCatName.trim()) return;
    const newCat: Category = {
      id: uuidv4().slice(0, 8),
      name: newCatName.trim(),
      emoji: newCatEmoji || '📦',
      items: [],
    };
    setCategories(prev => [...prev, newCat]);
    setNewCatName('');
    setNewCatEmoji('📦');
    setShowAddCatForm(false);
  };

  const deleteCategory = (categoryId: string) => {
    if (!confirm('确定删除该分类及其所有物品？')) return;
    setCategories(prev => prev.filter(cat => cat.id !== categoryId));
  };

  const shareLink = listId
    ? `${window.location.origin}${window.location.pathname}?list=${listId}`
    : '';

  const shareText = generateShareText(categories);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = shareLink;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    } catch { /* ignore */ }
  };

  // ─── 统计数据 ─────────────────────────────────────────────────────────────────

  const totalItems = categories.reduce((s, c) => s + c.items.length, 0);
  const checkedItems = categories.reduce((s, c) => s + c.items.filter(i => i.checked).length, 0);
  const overallPct = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;

  // ─── 渲染 ─────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen pb-16">
      {/* ── 顶部 Header ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-rose-100 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-rose-700 flex items-center gap-2">
              🧸 待产包清单
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              已完成 {checkedItems}/{totalItems} 项（{overallPct}%）
            </p>
          </div>
          <button
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-1.5 bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors"
          >
            <ShareIcon />
            分享
          </button>
        </div>
        {/* 总进度条 */}
        <div className="max-w-2xl mx-auto mt-2">
          <div className="w-full bg-rose-100 rounded-full h-2 overflow-hidden">
            <div
              className="progress-bar bg-rose-400 h-2 rounded-full"
              style={{ width: `${overallPct}%` }}
            />
          </div>
        </div>
      </header>

      {/* ── 主体内容 ─────────────────────────────────────────────────────── */}
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {categories.map((cat, catIdx) => {
          const catChecked = cat.items.filter(i => i.checked).length;
          const catPct = cat.items.length > 0 ? Math.round((catChecked / cat.items.length) * 100) : 0;

          return (
            <CategoryCard
              key={cat.id}
              category={cat}
              catIdx={catIdx}
              catChecked={catChecked}
              catPct={catPct}
              onToggleItem={toggleItem}
              onUpdateQty={updateQuantity}
              onDeleteItem={deleteItem}
              onAddItem={addItem}
              onDeleteCategory={deleteCategory}
              editingItemId={editingItemId}
              editingNote={editingNote}
              setEditingItemId={setEditingItemId}
              setEditingNote={setEditingNote}
              onSaveNote={saveNote}
            />
          );
        })}

        {/* ── 添加新分类 ─────────────────────────────────────────────────── */}
        {showAddCatForm ? (
          <div className="fade-in bg-white rounded-2xl border border-rose-200 p-4 space-y-3">
            <h3 className="font-semibold text-gray-700 text-sm">新建分类</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={newCatEmoji}
                onChange={e => setNewCatEmoji(e.target.value)}
                className="w-12 text-center border border-gray-200 rounded-lg px-2 py-2 text-lg focus:outline-none focus:border-rose-300"
                maxLength={4}
              />
              <input
                type="text"
                value={newCatName}
                onChange={e => setNewCatName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addCategory()}
                placeholder="分类名称，如：出院用品"
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-300"
                autoFocus
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={addCategory}
                disabled={!newCatName.trim()}
                className="flex-1 bg-rose-500 hover:bg-rose-600 disabled:opacity-40 text-white text-sm font-medium py-2 rounded-lg transition-colors"
              >
                添加分类
              </button>
              <button
                onClick={() => { setShowAddCatForm(false); setNewCatName(''); }}
                className="px-4 border border-gray-200 text-gray-500 text-sm py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAddCatForm(true)}
            className="w-full border-2 border-dashed border-rose-200 hover:border-rose-400 text-rose-400 hover:text-rose-500 rounded-2xl py-4 text-sm font-medium transition-colors flex items-center justify-center gap-1.5"
          >
            <PlusIcon />
            添加新分类
          </button>
        )}
      </main>

      {/* ── 分享弹窗 ─────────────────────────────────────────────────────── */}
      {showShareModal && (
        <div
          className="fixed inset-0 z-50 bg-black/30 flex items-end sm:items-center justify-center p-4"
          onClick={() => setShowShareModal(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-md p-6 space-y-4 fade-in"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="font-bold text-lg text-gray-800">分享清单</h2>

            {/* 分享链接 */}
            <div>
              <p className="text-xs text-gray-500 mb-1.5">分享链接（同一链接多人可查看和编辑）</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareLink}
                  readOnly
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 focus:outline-none"
                  onFocus={e => e.target.select()}
                />
                <button
                  onClick={copyLink}
                  className="bg-rose-500 hover:bg-rose-600 text-white text-sm px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
                >
                  {shareCopied ? '已复制 ✓' : '复制链接'}
                </button>
              </div>
            </div>

            {/* 导出文本 */}
            <div>
              <p className="text-xs text-gray-500 mb-1.5">或导出为文字清单（可粘贴到微信/备忘录）</p>
              <button
                onClick={copyText}
                className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 text-sm font-medium py-2.5 rounded-lg transition-colors border border-rose-200"
              >
                {shareCopied ? '已复制 ✓' : '📋 复制文字清单'}
              </button>
            </div>

            {/* 预览 */}
            <div>
              <p className="text-xs text-gray-500 mb-1.5">文字清单预览</p>
              <pre className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-xs text-gray-600 overflow-auto max-h-48 whitespace-pre-wrap font-sans leading-relaxed">
                {shareText}
              </pre>
            </div>

            <button
              onClick={() => setShowShareModal(false)}
              className="w-full text-gray-400 text-sm py-2 hover:text-gray-600 transition-colors"
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── CategoryCard 组件 ──────────────────────────────────────────────────────────

interface CategoryCardProps {
  category: Category;
  catIdx: number;
  catChecked: number;
  catPct: number;
  onToggleItem: (catId: string, itemId: string) => void;
  onUpdateQty: (catId: string, itemId: string, delta: number) => void;
  onDeleteItem: (catId: string, itemId: string) => void;
  onAddItem: (catId: string, name: string) => void;
  onDeleteCategory: (catId: string) => void;
  editingItemId: string | null;
  editingNote: string;
  setEditingItemId: (id: string | null) => void;
  setEditingNote: (note: string) => void;
  onSaveNote: (catId: string, itemId: string, note: string) => void;
}

function CategoryCard({
  category, catIdx, catChecked, catPct,
  onToggleItem, onUpdateQty, onDeleteItem, onAddItem, onDeleteCategory,
  editingItemId, editingNote, setEditingItemId, setEditingNote, onSaveNote,
}: CategoryCardProps) {
  const [isCollapsed, setIsCollapsed] = useState(catPct === 100);
  const [newItemName, setNewItemName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleAdd = () => {
    if (!newItemName.trim()) return;
    onAddItem(category.id, newItemName);
    setNewItemName('');
  };

  const pctColor = catPct === 100
    ? 'text-green-600'
    : catPct >= 50
      ? 'text-amber-600'
      : 'text-rose-500';

  return (
    <div className="category-card bg-white rounded-2xl border border-rose-100 overflow-hidden shadow-sm">
      {/* 分类标题 */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-rose-50/50 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">{category.emoji}</span>
          <div className="text-left">
            <h2 className="font-semibold text-gray-800 text-sm">{category.name}</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="w-20 bg-rose-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="progress-bar bg-rose-400 h-1.5 rounded-full"
                  style={{ width: `${catPct}%` }}
                />
              </div>
              <span className={`text-xs font-medium ${pctColor}`}>
                {catChecked}/{category.items.length}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* 删除分类按钮 */}
          <div className="relative">
            <button
              onClick={e => { e.stopPropagation(); setShowDelete(!showDelete); }}
              className="text-gray-300 hover:text-red-400 text-xs p-1 transition-colors"
              title="删除分类"
            >
              ⋮
            </button>
            {showDelete && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowDelete(false)} />
                <div className="absolute right-0 top-7 z-20 bg-white border border-gray-100 rounded-xl shadow-lg p-2 w-32 fade-in">
                  <button
                    onClick={e => { e.stopPropagation(); onDeleteCategory(category.id); setShowDelete(false); }}
                    className="w-full text-left text-xs text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
                  >
                    🗑️ 删除分类
                  </button>
                </div>
              </>
            )}
          </div>
          <ChevronIcon open={!isCollapsed} />
        </div>
      </button>

      {/* 分类内容 */}
      {!isCollapsed && (
        <div className="px-4 pb-4 space-y-1">
          {category.items.map((item, idx) => (
            <div key={item.id}>
              <ItemRow
                item={item}
                idx={idx}
                catId={category.id}
                onToggle={onToggleItem}
                onUpdateQty={onUpdateQty}
                onDelete={onDeleteItem}
                isEditing={editingItemId === item.id}
                editingNote={editingNote}
                onStartEdit={() => { setEditingItemId(item.id); setEditingNote(item.note); }}
                onNoteChange={setEditingNote}
                onSaveNote={() => onSaveNote(category.id, item.id, editingNote)}
                onCancelEdit={() => setEditingItemId(null)}
              />
            </div>
          ))}

          {/* 添加物品 */}
          {showAddForm ? (
            <div className="fade-in flex gap-2 mt-2">
              <input
                type="text"
                value={newItemName}
                onChange={e => setNewItemName(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleAdd();
                  if (e.key === 'Escape') { setShowAddForm(false); setNewItemName(''); }
                }}
                placeholder="输入物品名称"
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-300"
                autoFocus
              />
              <button
                onClick={handleAdd}
                disabled={!newItemName.trim()}
                className="bg-rose-500 hover:bg-rose-600 disabled:opacity-40 text-white text-sm px-4 py-2 rounded-lg transition-colors"
              >
                添加
              </button>
              <button
                onClick={() => { setShowAddForm(false); setNewItemName(''); }}
                className="border border-gray-200 text-gray-400 text-sm px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full mt-2 text-rose-400 hover:text-rose-500 text-sm py-2 flex items-center justify-center gap-1 hover:bg-rose-50 rounded-lg transition-colors"
            >
              <PlusIcon />
              添加物品
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── ItemRow 组件 ────────────────────────────────────────────────────────────────

interface ItemRowProps {
  item: ChecklistItem;
  idx: number;
  catId: string;
  onToggle: (catId: string, itemId: string) => void;
  onUpdateQty: (catId: string, itemId: string, delta: number) => void;
  onDelete: (catId: string, itemId: string) => void;
  isEditing: boolean;
  editingNote: string;
  onStartEdit: () => void;
  onNoteChange: (note: string) => void;
  onSaveNote: () => void;
  onCancelEdit: () => void;
}

function ItemRow({
  item, idx, catId,
  onToggle, onUpdateQty, onDelete,
  isEditing, editingNote, onStartEdit, onNoteChange, onSaveNote, onCancelEdit,
}: ItemRowProps) {
  const [showActions, setShowActions] = useState(false);

  return (
    <div className="item-row rounded-xl px-2 py-2">
      <div className="flex items-center gap-2.5">
        {/* 序号 */}
        <span className="text-xs text-gray-300 w-4 text-center font-mono flex-shrink-0">
          {idx + 1}
        </span>

        {/* 复选框 */}
        <button
          onClick={() => onToggle(catId, item.id)}
          className={`flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
            item.checked
              ? 'bg-rose-400 border-rose-400 text-white check-animate'
              : 'border-gray-300 hover:border-rose-400'
          }`}
        >
          {item.checked && <CheckIcon />}
        </button>

        {/* 名称 */}
        <span className={`flex-1 text-sm transition-all ${
          item.checked ? 'text-gray-400 line-through' : 'text-gray-700'
        }`}>
          {item.name}
          {item.note && !isEditing && (
            <span className="ml-1.5 text-xs text-gray-400">（{item.note}）</span>
          )}
        </span>

        {/* 数量控制 */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={() => onUpdateQty(catId, item.id, -1)}
            disabled={item.quantity <= 1}
            className="w-5 h-5 rounded-md bg-gray-100 hover:bg-rose-100 text-gray-500 text-xs flex items-center justify-center disabled:opacity-30 transition-colors"
          >
            −
          </button>
          <span className="text-xs text-gray-500 w-4 text-center font-medium">{item.quantity}</span>
          <button
            onClick={() => onUpdateQty(catId, item.id, 1)}
            className="w-5 h-5 rounded-md bg-gray-100 hover:bg-rose-100 text-gray-500 text-xs flex items-center justify-center transition-colors"
          >
            +
          </button>
        </div>

        {/* 操作菜单 */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setShowActions(!showActions)}
            className="text-gray-300 hover:text-gray-500 text-sm px-1 transition-colors"
          >
            ⋯
          </button>
          {showActions && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowActions(false)} />
              <div className="absolute right-0 top-7 z-20 bg-white border border-gray-100 rounded-xl shadow-lg p-1.5 w-28 fade-in">
                <button
                  onClick={() => { onStartEdit(); setShowActions(false); }}
                  className="w-full text-left text-xs text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
                >
                  📝 添加备注
                </button>
                <button
                  onClick={() => { onDelete(catId, item.id); setShowActions(false); }}
                  className="w-full text-left text-xs text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
                >
                  🗑️ 删除物品
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 备注编辑行 */}
      {isEditing && (
        <div className="fade-in flex gap-2 ml-9 mt-1.5">
          <input
            type="text"
            value={editingNote}
            onChange={e => onNoteChange(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') onSaveNote();
              if (e.key === 'Escape') onCancelEdit();
            }}
            placeholder="添加备注（如：品牌、规格）"
            className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-rose-300"
            autoFocus
          />
          <button
            onClick={onSaveNote}
            className="bg-rose-500 hover:bg-rose-600 text-white text-xs px-3 py-1.5 rounded-lg transition-colors"
          >
            保存
          </button>
          <button
            onClick={onCancelEdit}
            className="text-gray-400 text-xs px-2 py-1.5 hover:text-gray-600 transition-colors"
          >
            取消
          </button>
        </div>
      )}
    </div>
  );
}

// ─── 图标组件 ────────────────────────────────────────────────────────────────────

function ShareIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
