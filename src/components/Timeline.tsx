"use client";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

const timelineData: TimelineItem[] = [
  {
    year: "2023 — 至今",
    title: "高级前端工程师 @ XX科技",
    description: "负责核心产品前端架构设计，推动组件库和工程化建设。",
  },
  {
    year: "2021 — 2023",
    title: "前端工程师 @ YY互娱",
    description: "参与多款 Web 应用开发，深耕 React 生态和性能优化。",
  },
  {
    year: "2017 — 2021",
    title: "计算机科学 本科",
    description: "主修计算机科学，自学前端开发，参加多个开源项目。",
  },
  {
    year: "缘起",
    title: "与代码结缘",
    description: "初中时用 FrontPage 做了第一个网页，从此对 Web 技术着迷。",
  },
];

export default function Timeline() {
  return (
    <div className="relative">
      {/* 竖线 */}
      <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px"
           style={{ background: "linear-gradient(180deg, #c4a595 0%, #a8c0a1 50%, #c8a87c 100%)" }} />

      <div className="space-y-10">
        {timelineData.map((item, index) => (
          <div
            key={item.year}
            className={`relative pl-14 md:pl-0 md:w-1/2 ${
              index % 2 === 0 ? "md:pr-14 md:ml-0" : "md:pl-14 md:ml-auto"
            }`}
          >
            {/* 圆点 */}
            <div
              className={`absolute top-1.5 w-2.5 h-2.5 rounded-full bg-white border-2 border-sage ring-4 ring-cream ${
                index % 2 === 0
                  ? "left-[0.32rem] md:left-auto md:right-[-0.33rem]"
                  : "left-[0.32rem] md:left-[-0.33rem]"
              }`}
            />

            <div className="card p-6">
              <span class="text-xs font-mono text-sage tracking-wide">{item.year}</span>
              <h3 class="text-base font-serif font-semibold text-ink mt-1.5 mb-2">
                {item.title}
              </h3>
              <p class="text-sm text-ink-light leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
