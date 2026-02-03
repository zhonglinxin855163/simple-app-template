export default async function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 text-center">
        <h1 className="text-4xl font-bold text-white mb-2">👋 你好，开发者！</h1>
        <p className="text-purple-200 mb-6">欢迎使用 Simple App Template</p>

        <div className="bg-white/5 rounded-xl p-4 mb-6 text-left">
          <p className="text-white font-medium mb-2">🚀 快速开始</p>
          <ul className="text-purple-200 text-sm space-y-1">
            <li>1. 编辑 <code className="bg-white/10 px-1 rounded">schema.ts</code> 定义数据表</li>
            <li>2. 运行 <code className="bg-white/10 px-1 rounded">npx drizzle-kit push</code></li>
            <li>3. 开始构建你的应用！</li>
          </ul>
        </div>

        <p className="text-purple-300/50 text-xs">
          编辑 <code className="text-purple-300">src/app/page.tsx</code> 修改此页面
        </p>
      </div>
    </div>
  );
}

