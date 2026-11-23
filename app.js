'use strict';

// A local, deterministic demo chatbot: works on GitHub Pages without an API key.
(function setupChatbot() {
  const panel = document.getElementById('chat-panel');
  const launcher = document.getElementById('chat-launcher');
  const messages = document.getElementById('chat-messages');
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const close = document.getElementById('chat-close');
  if (!panel || !launcher || !messages || !form || !input || !close) return;

  function addMessage(sender, message) {
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble ' + sender;
    bubble.textContent = message;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
  }
  function showChat() {
    panel.hidden = false;
    launcher.setAttribute('aria-expanded', 'true');
    input.focus();
  }
  function hideChat() {
    panel.hidden = true;
    launcher.setAttribute('aria-expanded', 'false');
    launcher.focus();
  }
  launcher.addEventListener('click', () => panel.hidden ? showChat() : hideChat());
  close.addEventListener('click', hideChat);
  document.querySelectorAll('[data-open-chat]').forEach(button => button.addEventListener('click', showChat));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !panel.hidden) hideChat(); });

  function answer(question) {
    const q = question.toLowerCase().trim();
    const has = (...words) => words.some(word => q.includes(word));
    if (has('hello', 'hi ', 'hey', 'good morning', 'good evening')) return 'Hello! I’m Nova, the Signal & Story demo assistant. I can explain our marketing concept, services, use of AI, campaign generator, or project process. What would you like to know?';
    if (has('cost', 'price', 'pricing', 'fee', 'budget', 'pay')) return 'Signal & Story is a student-created business concept, not a live agency. There are no real client packages or published prices. A future proposal could be scoped around research, creative strategy, and campaign optimization.';
    if (has('chatbot', 'nova', 'real ai', 'large language model')) return 'I’m Nova, a functional browser-based chatbot demo. I respond to common questions using built-in website knowledge, so I work on both pages without sending your messages to an external service.';
    if (has('privacy', 'ethical', 'personal data', 'consent', 'responsib')) return 'Our concept emphasizes responsible AI: permission-based information, careful human review, no unsupported claims, and clear explanation of how insights are used. Customer trust is part of the strategy.';
    if (has('campaign spark', 'campaign lab', 'generator', 'interactive', 'x-factor', 'x factor')) return 'Campaign Spark is the interactive tool on our home page. Pick your industry, goal, and brand personality, then press “Generate campaign idea” for a sample headline, message, channel suggestions, and creative direction. It is a concept tool, not a sales forecast.';
    if (has('ai', 'machine learning', 'automati', 'algorithm', 'intelligence')) return 'AI supports three stages: research and pattern discovery, creative concept prototyping, and campaign experimentation. Human marketers still set goals, check outputs, protect privacy, and make the final decisions.';
    if (has('approach', 'process', 'step', 'how it works', 'method')) return 'Our framework has three stages: 1) Discover the audience and problem; 2) Design a relevant, human-centered story; 3) Evolve through measurement and experiments. The Our Approach page explains each stage.';
    if (has('service', 'offer', 'what do you do', 'help me', 'consult')) return 'The studio concept focuses on three services: Audience Intelligence, Creative Strategy, and Intelligent Optimization. Together they connect research, storytelling, and learning from campaign results.';
    if (has('hotel', 'hospitality', 'restaurant', 'tourism', 'travel')) return 'For a hotel, a starting campaign could highlight memorable experiences, local stories, and guest benefits. Try selecting “Hotels & hospitality” in Campaign Spark to create a sample concept.';
    if (has('target', 'audience', 'customer', 'market', 'segmen')) return 'We begin with customer motivations and context, not generic demographic assumptions. AI can help spot patterns, while human review decides what is relevant and fair to the audience.';
    if (has('contact', 'email', 'phone', 'book', 'schedule', 'hire', 'meet')) return 'Signal & Story is a student website concept for a marketing lab, so it does not currently accept client bookings or provide a business contact address. You can explore the method and test Campaign Spark here.';
    if (has('about', 'who are you', 'company', 'business', 'studio')) return 'Signal & Story is a proposed AI-powered marketing studio. Its mission is to combine useful data and AI tools with human creativity to make marketing more meaningful.';
    if (has('thank', 'great', 'nice', 'cool')) return 'You’re welcome! Try asking “What services do you offer?” or visit Campaign Spark to create your own sample campaign.';
    return 'That’s an interesting question. I’m a focused demo assistant, so I can best help with our services, AI approach, customer research, ethical principles, process, or Campaign Spark. Which would you like to explore?';
  }
  function send(question) {
    const text = String(question || '').trim();
    if (!text) return;
    addMessage('user', text);
    addMessage('bot', answer(text));
    input.value = '';
    input.focus();
  }
  form.addEventListener('submit', event => { event.preventDefault(); send(input.value); });
  document.querySelectorAll('[data-chat-prompt]').forEach(button => button.addEventListener('click', () => { showChat(); send(button.dataset.chatPrompt); }));
  addMessage('bot', 'Hi, I’m Nova ✦  Welcome to Signal & Story. Ask me about our services, our AI approach, or the interactive Campaign Spark experience!');
})();

(function setupCampaignSpark() {
  const form = document.getElementById('campaign-form');
  if (!form) return;
  const headline = document.getElementById('idea-headline');
  const explanation = document.getElementById('idea-explanation');
  const channels = document.getElementById('idea-channels');
  const visual = document.getElementById('idea-visual');
  const copy = document.getElementById('copy-idea');
  const businesses = {
    hospitality: { subject:'an unforgettable stay', hero:'your next favorite place', product:'travelers', channel:'Instagram Reels · Search · Email', detail:'real guest moments and distinctive experiences' },
    retail: { subject:'a more personal discovery', hero:'the things you love', product:'shoppers', channel:'Short-form video · Social · Email', detail:'products in relatable everyday situations' },
    wellness: { subject:'a healthier everyday', hero:'your next best habit', product:'new members', channel:'Local Search · Instagram · Email', detail:'welcoming, real-life wellness moments' },
    services: { subject:'confidence in every decision', hero:'a partner you can trust', product:'prospective clients', channel:'LinkedIn · Search · Email', detail:'credible people and useful explanations' }
  };
  const goals = {
    awareness: { action:'Help new audiences discover', note:'Lead with a memorable first impression and a clear invitation to learn more.' },
    engagement: { action:'Invite people to talk about', note:'Build content that prompts stories, questions, and meaningful participation.' },
    loyalty: { action:'Give existing customers a reason to return to', note:'Make helpful follow-ups and thoughtful recognition part of the experience.' }
  };
  const tones = {
    bold: { opener:'Make room for', creative:'Vibrant motion · Strong contrast' },
    warm: { opener:'Feel at home with', creative:'Candid stories · Soft natural light' },
    refined: { opener:'Discover the art of', creative:'Editorial images · Minimal design' }
  };
  function generate() {
    const b = businesses[document.getElementById('industry').value];
    const g = goals[document.getElementById('goal').value];
    const t = tones[document.getElementById('tone').value];
    headline.textContent = t.opener + ' ' + b.hero + '.';
    explanation.textContent = g.action + ' ' + b.subject + '. ' + g.note + ' Focus on ' + b.detail + ' to connect with ' + b.product + '.';
    channels.textContent = b.channel;
    visual.textContent = t.creative;
    copy.textContent = 'Copy campaign brief ↗';
  }
  form.addEventListener('submit', event => { event.preventDefault(); generate(); document.getElementById('idea-output').scrollIntoView({block:'nearest',behavior:'smooth'}); });
  copy.addEventListener('click', async () => {
    const value = 'Signal & Story — Sample Campaign Brief\nHeadline: ' + headline.textContent + '\nConcept: ' + explanation.textContent + '\nChannels: ' + channels.textContent + '\nCreative direction: ' + visual.textContent + '\nIllustrative concept, not a performance forecast.';
    try {
      if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(value); }
      else { const temp = document.createElement('textarea');temp.value = value;document.body.appendChild(temp);temp.select();document.execCommand('copy');temp.remove(); }
      copy.textContent = 'Copied to clipboard ✓';
    } catch (error) { copy.textContent = 'Please select the brief to copy'; }
  });
})();

(function ensureVideoPlayback() {
  const video = document.getElementById('hero-video');
  if (!video) return;
  video.muted = true;
  video.defaultMuted = true;
  video.loop = true;
  video.playsInline = true;
  const tryPlay = () => { const promise = video.play(); if (promise && typeof promise.catch === 'function') promise.catch(() => {}); };
  if (document.readyState === 'complete') tryPlay();
  else window.addEventListener('load', tryPlay, { once:true });
  document.addEventListener('visibilitychange', () => { if (!document.hidden && video.paused) tryPlay(); });
})();
