import React from 'react';

export default function FaqSection() {
  const faqs = [
    {
      q: '机场和 VPN 有什么区别？',
      a: '机场通常指提供代理节点、订阅链接和多客户端导入方式的服务商，用户会通过 Clash、Shadowrocket、sing-box 等客户端使用；传统 VPN 更多是一套封装好的官方客户端。两者都可能用于科学上网，但配置方式、节点选择、稳定性和售后模式不同。'
    },
    {
      q: '机场推荐看价格还是稳定性？',
      a: '价格只能说明使用成本，不能单独代表服务质量。更合理的判断顺序是先看稳定性、可用率、延迟、代理请求失败率和风险记录，再比较价格和套餐周期。特别便宜但长期波动或风险信号明显的机场，不适合作为长期主力。'
    },
    {
      q: '支持支付宝的机场安全吗？',
      a: '支持支付宝只说明付款方式更适合普通用户核对订单，不等于机场本身一定安全。仍然需要结合官网状态、历史记录、近期投诉、退款规则、客服渠道和榜单表现判断，避免因为支付方便就忽略服务风险。'
    },
    {
      q: '支持 USDT 的机场适合谁？',
      a: 'USDT 更适合熟悉链类型、到账确认、交易哈希和售后沟通的人。它可能提供更灵活的支付选择，但退款、汇率、转账手续费和地址核对都需要用户自己承担更多责任，新手不应只因为支持 USDT 就直接购买长期套餐。'
    },
    {
      q: '为什么晚高峰测试很重要？',
      a: '很多机场在白天或低峰时段表现正常，但晚高峰更容易暴露拥塞、代理请求失败、延迟抖动和流媒体不可用等问题。晚高峰测试能更接近日常真实使用压力，因此比单次低峰测速更适合判断机场是否能长期使用。'
    }
  ];

  return (
    <section className="home-v3-faq" aria-labelledby="home-v3-faq-title">
      <div className="home-v3-section-head">
        <div>
          <span>FAQ &amp; guide</span>
          <h2 id="home-v3-faq-title">常见问题与机场选购指南</h2>
          <p>围绕价格、稳定性、支付方式与晚高峰测试的公开说明。</p>
        </div>
      </div>

      <div>
        {faqs.map((faq, idx) => (
          <details key={idx} defaultOpen={idx === 0}>
            <summary>
              <b>Q</b>
              {faq.q}
              <span aria-hidden="true">⌄</span>
            </summary>
            <p>{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
