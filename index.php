<?php if (!defined('ABSPATH')) { exit; } ?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo('charset'); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<header class="mi-site-header">
  <div class="mi-container mi-nav">
    <a class="mi-brand" href="<?php echo esc_url(home_url('/')); ?>"><span class="mi-brand-mark">✦</span><span><?php bloginfo('name'); ?></span></a>
    <button class="mi-menu-toggle" type="button" aria-label="Menu" aria-expanded="false">☰</button>
    <nav class="mi-menu" aria-label="Main menu">
      <a href="#services">Services</a><a href="#how-it-works">How it works</a><a href="#pricing">Pricing</a><a href="#testimonials">Reviews</a><a class="mi-button mi-button--gold" href="#pricing">Start Reading</a>
    </nav>
  </div>
</header>
<main>
<section class="mi-hero">
  <div class="mi-container mi-hero-grid">
    <div class="mi-reveal">
      <p class="mi-eyebrow">Private spiritual guidance</p>
      <h1 class="mi-title">Answers that feel calm, clear, and personal.</h1>
      <p class="mi-lead">A premium fortune-telling experience for love, career, timing, energy and decisions. Designed for quick trust, warm emotion and easy conversion.</p>
      <div class="mi-actions"><a class="mi-button" href="#pricing">Ask your question</a><a class="mi-button mi-button--soft" href="#how-it-works">See how it works</a></div>
      <div class="mi-proof-row"><span class="mi-proof">Confidential reading</span><span class="mi-proof">Clear written answer</span><span class="mi-proof">Fast mobile checkout</span></div>
    </div>
    <div class="mi-oracle-card mi-reveal">
      <div class="mi-card-top"><span class="mi-live-pill">Available today</span><span class="mi-live-pill">4.9★ rated</span></div>
      <div class="mi-reading-panel">
        <div class="mi-moon"></div>
        <div class="mi-reading-card"><h3>Tonight's insight</h3><p>Your next step becomes easier when the question is specific. Choose one area, then let the reading clarify the hidden pattern.</p></div>
        <div class="mi-floating-note"><strong>Best for:</strong><span>Love clarity, career timing, decision support, future direction.</span></div>
      </div>
    </div>
  </div>
</section>
<section id="services" class="mi-section"><div class="mi-container"><p class="mi-eyebrow">Services</p><h2 class="mi-section-title">Choose the reading style your visitor needs.</h2><p class="mi-lead">The homepage is structured for paid spiritual services and can later connect to WooCommerce, Stripe checkout, WhatsApp or a custom form.</p><div class="mi-grid-3" style="margin-top:34px"><article class="mi-service-card mi-reveal"><div class="mi-icon">☾</div><h3>Love & Relationship</h3><p>Gentle clarity for attraction, reconciliation, commitment and emotional uncertainty.</p></article><article class="mi-service-card mi-reveal"><div class="mi-icon">✦</div><h3>Career & Money</h3><p>Guidance for offers, timing, business choices and financial energy shifts.</p></article><article class="mi-service-card mi-reveal"><div class="mi-icon">♃</div><h3>Future Direction</h3><p>A calm overview of patterns, opportunities and the next practical move.</p></article></div></div></section>
<section id="how-it-works" class="mi-dark-band"><div class="mi-container"><p class="mi-eyebrow">Process</p><h2 class="mi-section-title">A simple flow that reduces decision pressure.</h2><p class="mi-lead">The design keeps the visitor focused: choose a question, submit details, receive a polished reading.</p><div class="mi-steps"><article class="mi-step mi-reveal"><h3>Pick a topic</h3><p>Love, career, timing or a custom concern.</p></article><article class="mi-step mi-reveal"><h3>Send context</h3><p>The user shares names, date details and one clear question.</p></article><article class="mi-step mi-reveal"><h3>Receive insight</h3><p>A private written answer explains the pattern and suggested action.</p></article></div></div></section>
<section class="mi-section"><div class="mi-container mi-split"><div><p class="mi-eyebrow">Design direction</p><h2 class="mi-section-title">Soft, mystical, trustworthy.</h2><p class="mi-lead">The visual system uses warm cream backgrounds, deep violet contrast, gold accents, rounded cards, soft gradients and subtle reveal animations.</p><ul class="mi-feature-list"><li>Mobile-first conversion layout</li><li>Premium oracle-style card visuals</li><li>Sections ready for checkout or WhatsApp links</li></ul></div><div class="mi-mini-reading mi-reveal"><div class="mi-mini-reading-inner"><blockquote>“The best answer begins with the right question.”</blockquote><cite>— Mystic Insights</cite></div></div></div></section>
<section id="pricing" class="mi-section"><div class="mi-container"><p class="mi-eyebrow">Pricing</p><h2 class="mi-section-title">Built for a low-friction first purchase.</h2><div class="mi-pricing"><article class="mi-price-card mi-reveal"><h3>Single Question</h3><p>For one focused concern.</p><div class="mi-price">$11.90</div><ul><li>One written answer</li><li>Clear advice</li><li>Private delivery</li></ul><a class="mi-button mi-button--soft" href="#contact">Choose</a></article><article class="mi-price-card is-featured mi-reveal"><h3>Two Questions</h3><p>Best first order.</p><div class="mi-price">$18.90</div><ul><li>Two related answers</li><li>Pattern summary</li><li>Recommended next step</li></ul><a class="mi-button" href="#contact">Start now</a></article><article class="mi-price-card mi-reveal"><h3>Deep Reading</h3><p>For complex situations.</p><div class="mi-price">$39</div><ul><li>Detailed written reading</li><li>Multiple angles</li><li>Action guidance</li></ul><a class="mi-button mi-button--soft" href="#contact">Choose</a></article></div></div></section>
<section id="testimonials" class="mi-section"><div class="mi-container"><p class="mi-eyebrow">Reviews</p><h2 class="mi-section-title">Warm social proof for trust.</h2><div class="mi-testimonials"><article class="mi-testimonial mi-reveal"><div class="mi-stars">★★★★★</div><p>“The answer was gentle but very direct. It helped me stop overthinking.”</p><strong>Emily R.</strong></article><article class="mi-testimonial mi-reveal"><div class="mi-stars">★★★★★</div><p>“Beautiful experience, easy to order, and the guidance felt personal.”</p><strong>Sarah M.</strong></article><article class="mi-testimonial mi-reveal"><div class="mi-stars">★★★★★</div><p>“I liked that it gave me a clear next step instead of vague words.”</p><strong>Jessica L.</strong></article></div></div></section>
<section id="contact" class="mi-cta"><div class="mi-container"><div class="mi-cta-box mi-reveal"><div><p class="mi-eyebrow">Ready</p><h2 class="mi-section-title">Ask one clear question today.</h2><p class="mi-lead">Next step: connect this button to WooCommerce checkout, Stripe, PayPal or WhatsApp.</p></div><a class="mi-button mi-button--gold" href="mailto:hello@example.com">Contact now</a></div></div></section>
</main>
<footer class="mi-site-footer"><div class="mi-container mi-footer-grid"><p>© <?php echo esc_html(date('Y')); ?> Mystic Insights. Spiritual guidance for entertainment and reflection.</p><div class="mi-footer-links"><a href="#services">Services</a><a href="#pricing">Pricing</a><a href="#contact">Contact</a></div></div></footer>
<?php wp_footer(); ?>
</body>
</html>
