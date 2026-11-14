import React from 'react';

export default function MethodologyView({ setCurrentRoute }) {
  return (
    <main className="page-main methodology-page">
      <section className="methodology-hero">
        <div className="methodology-hero-copy">
          <div className="methodology-eyebrow">Node Methodology</div>
          <h1>我们如何评估<span>一个机场</span></h1>
          <p>科学上网 · Node 通过持续采样、多维信号和历史记录，判断一个服务是否具备长期使用价值。本页解释评估原则、数据来源与结果解读方式；模型参数、阈值与计算细节属于内部方法，不对外披露。</p>
        </div>
        <div className="methodology-facts">
          <div><strong>五维观察</strong><span>稳定、性能、覆盖、价值与风险</span></div>
          <div><strong>持续更新</strong><span>近期变化会被及时记录</span></div>
          <div><strong>历史可追溯</strong><span>报告保留日期与规则版本</span></div>
          <div><strong>公开范围</strong><span>原则公开，参数与计算细节不披露</span></div>
        </div>
      </section>

      <section className="methodology-section">
        <div className="methodology-section-heading">
          <span>Evaluation Framework</span>
          <h2>五维评估框架</h2>
          <p>五个维度分别回答不同问题。它们共同构成判断依据，但任何一个单项都不能独立决定推荐。</p>
        </div>
        <div className="methodology-dimensions">
          <article>
            <b>S</b>
            <h3>稳定性</h3>
            <p>观察服务是否持续可用、连接是否平稳，以及健康表现能否长期保持。</p>
          </article>
          <article>
            <b>P</b>
            <h3>性能</h3>
            <p>观察连接响应、传输能力和真实代理请求中的实际体验。</p>
          </article>
          <article>
            <b>N</b>
            <h3>网络覆盖</h3>
            <p>观察可检测节点的地区广度、健康情况与整体分布结构。</p>
          </article>
          <article>
            <b>C</b>
            <h3>性价比</h3>
            <p>观察价格、套餐能力与真实使用体验之间是否匹配。</p>
          </article>
          <article>
            <b>R</b>
            <h3>风险</h3>
            <p>观察域名、证书、投诉与历史异常等独立信任信号。</p>
          </article>
        </div>
      </section>

      <section className="methodology-section">
        <div className="methodology-section-heading">
          <span>Evidence Pipeline</span>
          <h2>数据如何形成结果</h2>
          <p>从采样到公开结论，每一步都有明确职责。流程公开，但不会暴露可被复制或针对性优化的内部实现。</p>
        </div>
        <div className="methodology-process">
          <article>
            <b>01</b>
            <h3>持续采集</h3>
            <p>从可检测节点、公开信息和日常监测任务中持续形成样本。</p>
          </article>
          <article>
            <b>02</b>
            <h3>真实性验证</h3>
            <p>关键网络结果需要经过实际代理请求或一致性检查。</p>
          </article>
          <article>
            <b>03</b>
            <h3>多维聚合</h3>
            <p>综合不同维度与时间范围，降低极端样本和单项高光的影响。</p>
          </article>
          <article>
            <b>04</b>
            <h3>异常复核</h3>
            <p>采集缺失、数据突变和风险信号会被独立标记并保留复核空间。</p>
          </article>
        </div>
      </section>

      <section className="methodology-section">
        <div className="methodology-section-heading">
          <span>Reading The Score</span>
          <h2>如何理解 科学上网 · Node 结果</h2>
          <p>公开分数是决策线索，不是对未来服务的保证。阅读时应同时关注趋势、证据完整度与风险状态。</p>
        </div>
        <div className="methodology-guidance">
          <article>
            <b>1</b>
            <h3>看综合，不看单项</h3>
            <p>速度快、价格低或节点多，都不能独立决定最终推荐。更重要的是多个维度能否共同支撑长期体验。</p>
          </article>
          <article>
            <b>2</b>
            <h3>看趋势，不看截图</h3>
            <p>近期变化会被及时记录，历史连续性也会作为判断背景。单次测速截图不能代替持续监测。</p>
          </article>
          <article>
            <b>3</b>
            <h3>看数据状态</h3>
            <p>样本不足、当日采集缺失或规则版本不同会明确提示，不会把缺少的数据伪装成确定结论。</p>
          </article>
        </div>
      </section>

      <section className="methodology-section">
        <div className="methodology-section-heading">
          <span>Transparency Boundary</span>
          <h2>透明度边界</h2>
          <p>我们公开足以帮助用户判断的证据，同时保留可能被用于复制模型、操纵数据或针对性优化的实现细节。</p>
        </div>
        <div className="methodology-boundary">
          <article>
            <span>Public</span>
            <h3>我们公开</h3>
            <p>用户可以核对结果来自什么信息，以及报告对应哪个时间与规则版本。</p>
            <ul>
              <li><i aria-hidden="true">✓</i>五个评估维度及其含义</li>
              <li><i aria-hidden="true">✓</i>报告日期、趋势与历史快照</li>
              <li><i aria-hidden="true">✓</i>风险来源类别与数据状态</li>
              <li><i aria-hidden="true">✓</i>规则版本与榜单更新说明</li>
              <li><i aria-hidden="true">✓</i>非付费排名与独立性声明</li>
            </ul>
          </article>
          <article className="is-protected">
            <span>Protected</span>
            <h3>我们保留</h3>
            <p>这些内容只用于内部评分、质量控制与抗操纵，不进入公开页面或机器可读数据。</p>
            <ul>
              <li><i aria-hidden="true">✓</i>模型权重与组合方式</li>
              <li><i aria-hidden="true">✓</i>判断阈值与内部参数</li>
              <li><i aria-hidden="true">✓</i>风险信号的具体处理规则</li>
              <li><i aria-hidden="true">✓</i>抗操纵与异常识别细节</li>
              <li><i aria-hidden="true">✓</i>可用于复算结果的实现逻辑</li>
            </ul>
          </article>
        </div>
        <p className="methodology-boundary-note">保留内部参数并不影响结果可追溯性：用户仍可查看数据日期、趋势、风险来源类别和历史报告，但无法直接复制或反向实现评分模型。</p>
      </section>

      <section className="methodology-section">
        <div className="methodology-section-heading">
          <span>Trust Principles</span>
          <h2>我们坚持的评测原则</h2>
        </div>
        <div className="methodology-principles">
          <article>
            <span aria-hidden="true">✓</span>
            <div><h3>持续监测</h3><p>关注长期表现与近期变化，不让一次采样代表全部体验。</p></div>
          </article>
          <article>
            <span aria-hidden="true">✓</span>
            <div><h3>真实请求</h3><p>关键网络判断尽量来自实际代理链路，而不是只看端口状态。</p></div>
          </article>
          <article>
            <span aria-hidden="true">✓</span>
            <div><h3>多维交叉</h3><p>稳定、性能、覆盖、价值与风险相互校验，降低单指标偏见。</p></div>
          </article>
          <article>
            <span aria-hidden="true">✓</span>
            <div><h3>风险单列</h3><p>信任风险独立呈现，用户可以区分体验下降与风险变化。</p></div>
          </article>
          <article>
            <span aria-hidden="true">✓</span>
            <div><h3>历史留痕</h3><p>报告保留对应日期和规则版本，避免后来规则改写当时结论。</p></div>
          </article>
          <article>
            <span aria-hidden="true">✓</span>
            <div><h3>非付费排名</h3><p>广告、优惠和商业合作不会直接改变 科学上网 · Node 公开排名。</p></div>
          </article>
        </div>
      </section>

      <section className="methodology-section">
        <div className="methodology-section-heading">
          <span>Common Questions</span>
          <h2>FAQ / 常见问题</h2>
        </div>
        <div className="methodology-faq">
          <details>
            <summary><span>低价机场一定高分吗？</span><i aria-hidden="true">＋</i></summary>
            <p>不会。价格只是评价价值的一部分，稳定性、性能、网络覆盖和风险表现同样会影响最终判断。</p>
          </details>
          <details>
            <summary><span>测速快就一定推荐吗？</span><i aria-hidden="true">＋</i></summary>
            <p>不会。单次测速只能说明一个时间点的表现，科学上网 · Node 更关注真实请求、持续稳定性、多地区表现和风险变化。</p>
          </details>
          <details>
            <summary><span>为什么新机场可能需要更长时间观察？</span><i aria-hidden="true">＋</i></summary>
            <p>新机场的有效样本和历史连续性较少。科学上网 · Node 会明确展示数据状态，并在积累足够证据前保持更谨慎的结论。</p>
          </details>
          <details>
            <summary><span>风险分低代表已经跑路了吗？</span><i aria-hidden="true">＋</i></summary>
            <p>不一定。它表示域名、证书、投诉或历史异常等信号值得关注，需要结合当前状态、报告日期和后续趋势判断。</p>
          </details>
          <details>
            <summary><span>科学上网 · Node 的机场推荐依据是什么？</span><i aria-hidden="true">＋</i></summary>
            <p>推荐依据来自稳定性、性能、网络覆盖、性价比和风险五个维度，以及对应的数据日期、趋势和完整性状态。广告活动不进入公开排名。</p>
          </details>
          <details>
            <summary><span>数据多久更新一次？</span><i aria-hidden="true">＋</i></summary>
            <p>监测任务持续运行，公开榜单和报告会根据已完成的数据批次更新。页面会显示对应日期，避免把历史结果误认为实时结论。</p>
          </details>
        </div>
      </section>

      <section className="methodology-cta">
        <div>
          <span>Methodology Note</span>
          <h2>长期可信，比单次高性能样本更重要。</h2>
          <p>先看综合排名，再结合报告日期、趋势和风险状态做判断。科学上网 · Node 提供证据，不替用户承诺未来。</p>
        </div>
        <div className="methodology-actions">
          <a 
            className="methodology-primary-action" 
            href="/rankings/all"
            onClick={(e) => {
              e.preventDefault();
              if (setCurrentRoute) setCurrentRoute('rankings');
            }}
          >
            查看机场排行 <span aria-hidden="true">→</span>
          </a>
          <a 
            className="methodology-secondary-action" 
            href="/deals"
            onClick={(e) => {
              e.preventDefault();
              if (setCurrentRoute) setCurrentRoute('deals');
            }}
          >
            查看活动优惠 <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </main>
  );
}
