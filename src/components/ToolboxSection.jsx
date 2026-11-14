import React from 'react';

export default function ToolboxSection({ setCurrentRoute, setToolsPlatform }) {
  const handleNav = (platform, e) => {
    e.preventDefault();
    if (setToolsPlatform) setToolsPlatform(platform);
    setCurrentRoute('tools');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <section>
      <div className="home-v3-section-head">
        <div>
          <span>Quick tools</span>
          <h2>网络工具箱</h2>
          <p>从客户端安装到出口网络验证</p>
        </div>
        <a 
          href="/tools" 
          onClick={(e) => handleNav('all', e)}
        >
          全部工具 →
        </a>
      </div>

      <div className="home-v3-tools">
        <a 
          href="/tools/download" 
          onClick={(e) => handleNav('all', e)}
        >
          <strong>翻墙工具下载</strong>
          <span>按 Windows、macOS、iOS、Android 与 Linux 查找常用代理客户端和可信安装入口。</span>
          <i aria-hidden="true">→</i>
        </a>

        <a 
          href="/tools/streaming-check" 
          onClick={(e) => handleNav('streaming-check', e)}
        >
          <strong>流媒体解锁检测</strong>
          <span>检测 ChatGPT、Netflix、Claude、TikTok、Disney+ 与 HBO Max 的地区覆盖和基础连通性。</span>
          <i aria-hidden="true">→</i>
        </a>

        <a 
          href="/tools/ip-check" 
          onClick={(e) => handleNav('ip-check', e)}
        >
          <strong>IP 检测</strong>
          <span>查询当前出口 IP、IPv4、IPv6 或域名对应的地区、ISP、组织、ASN 与时区信息。</span>
          <i aria-hidden="true">→</i>
        </a>

        <a 
          href="/tools/ip-purity-check" 
          onClick={(e) => handleNav('ip-purity', e)}
        >
          <strong>IP 纯净度检测</strong>
          <span>查询原生 IP、网络归属、ASN 路由历史与注册分配记录。</span>
          <i aria-hidden="true">→</i>
        </a>

        <a 
          href="/tools/dns-leak-test" 
          onClick={(e) => handleNav('dns-leak', e)}
        >
          <strong>DNS 泄漏检测</strong>
          <span>通过独立权威 DNS 探针识别递归解析器，并比较出口地区、运营商与 DNSSEC 信号。</span>
          <i aria-hidden="true">→</i>
        </a>
      </div>
    </section>
  );
}
