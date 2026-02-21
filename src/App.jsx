import React, { useState, useEffect } from 'react';
import './styles/global.css';

const PAYMENT_URL = 'https://flutterwave.com/pay/3z2wuuwhavsl';
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xkovvlpg';

const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        company: '',
        revenue: '',
        teamSize: '',
        toolStack: '',
        contactMethod: 'Email',
        phone: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.08 });

        document.querySelectorAll('.reveal').forEach((el, index) => {
            el.style.transitionDelay = `${index * 100}ms`;
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const handleOpenModal = () => {
        setIsModalOpen(true);
        setIsSuccess(false);
        setSubmitError(null);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.fullName || !formData.email || !formData.company) {
            alert("Full Name, Business Email, and Company Name are required.");
            return;
        }

        setIsSubmitting(true);
        setSubmitError(null);

        // Form submission logic
        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, timestamp: new Date().toISOString() })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setIsSuccess(true);

            setTimeout(() => {
                if (PAYMENT_URL !== 'YOUR_PAYMENT_URL') {
                    window.location.href = PAYMENT_URL;
                } else {
                    alert("Redirect to PAYMENT_URL would happen here.");
                    handleCloseModal();
                }
            }, 2500);

        } catch (e) {
            console.error(e);
            setSubmitError("There was an error submitting your request. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <nav className="nav-container">
                <div className="nav-island">
                    <div className="nav-left">
                        <img src="/logo.svg" alt="Eccentric Systems Logo" className="nav-logo-img" />
                        <span className="nav-brand font-display">Eccentric <span className="text-gold">Systems</span></span>
                        <span className="nav-pill-tag font-mono text-green">Operational Intelligence</span>
                    </div>
                    <div className="nav-right">
                        <button className="btn-nav" onClick={handleOpenModal}>Get Analysis</button>
                    </div>
                </div>
            </nav>

            <main>
                {/* HERO SECTION */}
                <section className="hero-section">
                    <div className="glow-green hero-glow"></div>
                    <div className="hero-content">
                        <div className="eyebrow-pill reveal"><span className="dot"></span>Operational Intelligence Audit</div>
                        <h1 className="hero-headline reveal">
                            <span className="line-one">Your revenue is growing.</span><br />
                            <span className="line-two italic">Your systems are not.</span>
                        </h1>
                        <p className="hero-subheadline reveal font-body">
                            We find the exact operational failures <strong className="text-white">costing you measurable revenue</strong> every month · then show you how to close them permanently.
                        </p>
                        <div className="hero-cta reveal">
                            <button className="btn-primary" onClick={handleOpenModal}>
                                Request Intelligence Audit
                                <span className="icon-circle">→</span>
                            </button>
                            <div className="hero-meta font-mono text-muted">
                                $3,500 · 5 to 7 business days · Full deliverable
                            </div>
                        </div>
                    </div>
                </section>

                {/* CONTEXT BRIDGE */}
                <div className="context-bridge">
                    <p className="font-display italic text-muted bridge-text">
                        If you received our operational snapshot, this page outlines the full analysis · what it covers, what you receive, and the financial impact of closing the gaps we identified.
                    </p>
                </div>

                {/* PROBLEM SECTION */}
                <section className="problem-section">
                    <div className="section-label">The Problem</div>
                    <h2 className="section-headline">Growth without infrastructure <span className="italic text-gold">costs more</span> than it earns.</h2>
                    <p className="section-body text-muted">
                        Invisible weekly revenue leakage systematically drains capital from growing companies. When operations stretch beyond their initial design, every friction point compounds.
                    </p>

                    <div className="grid-container problem-grid">
                        {[
                            { num: '01', title: 'Pipeline Decay', desc: 'Leads enter and disappear due to inconsistent follow-up.', impact: 'Direct revenue leakage · Measurable · Recoverable' },
                            { num: '02', title: 'Fulfillment Friction', desc: 'Manual handoffs break between commitment and value delivery.', impact: 'Churn · Refund exposure · Reputation damage' },
                            { num: '03', title: 'Reporting Blindness', desc: 'Decisions made on instinct, data not clean or fast enough.', impact: 'Slow decisions · Missed inflection points · Reactive management' },
                            { num: '04', title: 'Hiring to Compensate', desc: 'Headcount added to manage what systems should handle.', impact: '$45K to $85K per role that should not exist' }
                        ].map((item, idx) => (
                            <div className="grid-item problem-card reveal" key={idx}>
                                <div className="card-top-accent"></div>
                                <div className="problem-num font-display text-dim">{item.num}</div>
                                <h3 className="problem-title text-white font-body">{item.title}</h3>
                                <p className="problem-desc text-muted font-body">{item.desc}</p>
                                <div className="problem-impact font-mono text-green">{item.impact}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* VALUE PROPOSITION */}
                <section className="bg-surface value-section">
                    <div className="section-label">The Opportunity</div>
                    <h2 className="section-headline">The gap between your growth rate and your systems maturity is <span className="italic text-gold">quantifiable</span>.</h2>
                    <p className="section-body text-muted">
                        Every operational failure eventually translates into a financial consequence. Closing these gaps produces immediate margin recovery.
                    </p>

                    <div className="grid-container value-grid">
                        {[
                            { num: '1%', title: 'Conversion recovery', desc: 'One percent improvement in fulfillment conversion at $10M revenue recovers $100K annually. Most audits surface 3 to 5 recoverable gaps of this scale.' },
                            { num: '$85K', title: 'Cost of one compensatory hire', desc: 'Every role added to manage what systems should handle is capital that compounds against you.' },
                            { num: '90 days', title: 'Time to measurable ROI', desc: 'Every roadmap is prioritised by financial impact and implementation speed. Highest-return fixes sequenced first.' }
                        ].map((item, idx) => (
                            <div className="grid-item value-card reveal" key={idx}>
                                <div className="value-num font-display text-green">{item.num}</div>
                                <h3 className="value-title text-white font-body">{item.title}</h3>
                                <p className="value-desc text-muted font-body">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* PROCESS SECTION */}
                <section className="process-section">
                    <div className="section-label">How It Works</div>
                    <h2 className="section-headline">A structured engagement. <span className="italic text-gold">A precise outcome.</span></h2>
                    <p className="section-body text-muted">
                        We act as a surgical diagnostic unit inside your business. Our methodology is entirely objective, data-driven, and focused exclusively on financial outcomes.
                    </p>

                    <div className="process-list grid-container">
                        {[
                            { step: 'Step 01', title: 'Structured Intake', desc: 'Detailed operational questionnaire, revenue flow, team structure, tool stack, process architecture.', day: 'Day 1' },
                            { step: 'Step 02', title: 'Stakeholder Interviews', desc: 'Focused sessions across operations, sales, fulfillment with targeted questions.', day: 'Days 2 to 3' },
                            { step: 'Step 03', title: 'Systems Architecture Mapping', desc: 'Full documentation of operational infrastructure, tool connections, data flows, failure nodes.', day: 'Days 3 to 4' },
                            { step: 'Step 04', title: 'Revenue Impact Modeling', desc: 'Every inefficiency translated into financial figures using actual data, actual volume, actual timelines.', day: 'Days 4 to 5' },
                            { step: 'Step 05', title: 'Roadmap Delivery', desc: 'Full written report, systems maps, revenue model, prioritised implementation roadmap.', day: 'Days 5 to 7' }
                        ].map((item, idx) => (
                            <div className="grid-item process-row reveal" key={idx}>
                                <div className="process-step font-mono text-green">{item.step}</div>
                                <div className="process-content">
                                    <h3 className="text-white font-body">{item.title}</h3>
                                    <p className="text-muted font-body">{item.desc}</p>
                                </div>
                                <div className="process-day font-mono text-muted">{item.day}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* DELIVERABLES SECTION */}
                <section className="deliverables-section">
                    <div className="section-label">The Deliverable</div>
                    <h2 className="section-headline">Not a presentation. <span className="italic text-gold">A working blueprint.</span></h2>

                    <div className="grid-container deliverables-grid">
                        {[
                            { num: '01', title: 'Systems Architecture Map', desc: 'Visual map of tool connections, data flows, handoff points, failure nodes.' },
                            { num: '02', title: 'Revenue Impact Model', desc: 'Financial model by process, by department, total annual cost. Actual numbers not estimates.' },
                            { num: '03', title: 'Process Timeline Breakdown', desc: 'Step-by-step breakdown of critical workflows, where time is lost, where delays compound.' },
                            { num: '04', title: 'Gap Analysis Report', desc: 'Every systems gap ranked by financial impact and implementation complexity.' },
                            { num: '05', title: 'Prioritised Implementation Roadmap', desc: 'Sequenced plan with financial impact estimate per intervention.' },
                            { num: '06', title: 'Walkthrough Recording', desc: 'Recorded video of all findings built for stakeholder distribution.' }
                        ].map((item, idx) => (
                            <div className="grid-item deliverable-card reveal" key={idx}>
                                <div className="del-num font-mono text-green">{item.num}</div>
                                <h3 className="text-white font-body deliverable-title">{item.title}</h3>
                                <p className="text-muted font-body deliverable-desc">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* MID-PAGE CTA */}
                <section className="bg-surface mid-cta-section">
                    <div className="mid-cta-left reveal">
                        <h2 className="mid-cta-headline font-display text-white">
                            The audit pays for itself the moment it identifies a single <span className="italic text-gold">recoverable gap.</span>
                        </h2>
                        <p className="text-muted font-body">
                            Most engagements surface between three and seven. One decision, made with complete information, changes the trajectory of a scaling company.
                        </p>
                    </div>
                    <div className="mid-cta-right reveal">
                        <button className="btn-primary" onClick={handleOpenModal}>
                            Request Intelligence Audit
                            <span className="icon-circle">→</span>
                        </button>
                    </div>
                </section>

                {/* PRICING SECTION */}
                <section className="pricing-section">
                    <div className="section-label">The Investment</div>
                    <h2 className="section-headline">One engagement. <span className="italic text-gold">Complete clarity.</span></h2>

                    <div className="pricing-container reveal">
                        <div className="price-display">
                            <span className="price-currency font-display text-gold">$</span>
                            <span className="price-amount font-display text-white">3,500</span>
                        </div>
                        <div className="price-label font-mono text-muted">Operational Intelligence Audit · One-Time Engagement Fee</div>

                        <div className="price-stats font-display text-white">
                            <div className="stat-block"><span className="stat-val">5 to 7</span><span className="stat-lbl font-mono text-muted">Business Days</span></div>
                            <div className="stat-block"><span className="stat-val">Private</span><span className="stat-lbl font-mono text-muted">Full Confidentiality</span></div>
                            <div className="stat-block"><span className="stat-val">100%</span><span className="stat-lbl font-mono text-muted">Focused On Your Business</span></div>
                        </div>

                        <div className="price-includes">
                            <ul className="includes-list font-body text-white">
                                <li>Systems architecture mapping</li>
                                <li>Revenue impact model</li>
                                <li>Stakeholder interview sessions</li>
                                <li>Process timeline breakdown</li>
                                <li>Full gap analysis report</li>
                                <li>Prioritised implementation roadmap</li>
                                <li>Walkthrough recording</li>
                                <li>30-day findings support</li>
                            </ul>
                        </div>

                        <div className="price-notice font-mono text-muted bg-surface">
                            Important: This engagement covers the full diagnostic analysis and implementation roadmap only. Deployment of identified solutions, infrastructure buildout, and ongoing systems management are priced separately based on scope. Your roadmap will include a clear outline and investment estimate for any recommended implementation work.
                        </div>

                        <button className="btn-primary pricing-btn" onClick={handleOpenModal}>
                            Begin Intelligence Audit <span className="icon-circle">→</span>
                        </button>
                    </div>
                </section>

                {/* QUALIFICATION SECTION */}
                <section className="bg-surface qual-section">
                    <div className="section-label">Is This For You</div>
                    <h2 className="section-headline">Built specifically for companies <span className="italic text-gold">at this stage.</span></h2>
                    <p className="section-body text-muted">
                        Our methodology is engineered exclusively for growth-stage operators ($1M to $20M). We do not serve pre-revenue startups or mature enterprises with established operations functions.
                    </p>

                    <div className="grid-container qual-list reveal">
                        {[
                            'Revenue between $1M and $20M annually',
                            'Growing but operationally strained by that growth',
                            'Friction in sales, fulfillment, onboarding, or reporting',
                            'Adding headcount to manage what systems should handle',
                            'Prepared to invest in structural improvement not surface fixes'
                        ].map((item, idx) => (
                            <div className="grid-item qual-row" key={idx}>
                                <span className="qual-dot bg-green"></span>
                                <span className="text-white font-body">{item}</span>
                            </div>
                        ))}
                    </div>

                    <div className="qual-not-for font-mono text-muted reveal">
                        This engagement is not suited for pre-revenue startups, enterprises with dedicated operations functions, or companies not prepared to act on findings. If the roadmap sits in a folder unused, this is not the right engagement.
                    </div>
                </section>

                {/* FINAL CTA SECTION */}
                <section className="final-cta-section center-layout">
                    <div className="glow-green final-glow"></div>
                    <h2 className="section-headline reveal">Find out exactly what your current systems are <span className="italic text-gold">costing you.</span></h2>
                    <p className="final-body text-muted font-body reveal">
                        Complete a short intake form. We review your business profile and confirm the engagement. The analysis begins within one business day of confirmation.
                    </p>
                    <div className="final-btn-wrapper reveal">
                        <button className="btn-primary" onClick={handleOpenModal}>
                            Request Intelligence Audit <span className="icon-circle">→</span>
                        </button>
                        <div className="hero-meta font-mono text-muted">
                            $3,500 · 5 to 7 business days · Full deliverable
                        </div>
                    </div>
                </section>
            </main>

            {/* FOOTER */}
            <footer className="site-footer">
                <div className="footer-left font-display text-muted">ECCENTRIC SYSTEMS</div>
                <div className="footer-right font-mono text-muted">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Confidentiality</a>
                    <a href="#">Contact</a>
                </div>
            </footer>

            {/* MODAL OVERLAY */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-box bg-surface" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className="modal-header-top">
                                <span className="section-label" style={{ marginBottom: 0 }}>Intake Form</span>
                                <button className="modal-close" onClick={handleCloseModal}>×</button>
                            </div>
                            <h2 className="font-display text-white modal-title">Request Intelligence Audit</h2>
                        </div>

                        <div className="modal-body">
                            {isSuccess ? (
                                <div className="modal-success center-layout">
                                    <div className="success-icon text-green font-display">✓</div>
                                    <h3 className="font-display text-white" style={{ fontSize: '28px', marginBottom: '8px' }}>Submission Received</h3>
                                    <p className="text-muted font-body" style={{ marginBottom: '24px' }}>Your profile is under review.</p>
                                    <p className="font-mono text-green" style={{ color: 'var(--green-dim)' }}>Redirecting to secure checkout...</p>
                                </div>
                            ) : (
                                <div className="modal-step">
                                    <div className="form-grid">
                                        <div className="input-group">
                                            <label className="font-mono text-green form-label">Full Name *</label>
                                            <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
                                        </div>
                                        <div className="input-group">
                                            <label className="font-mono text-green form-label">Business Email *</label>
                                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                                        </div>
                                    </div>
                                    <div className="input-group">
                                        <label className="font-mono text-green form-label">Company Name *</label>
                                        <input type="text" name="company" value={formData.company} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-grid">
                                        <div className="input-group">
                                            <label className="font-mono text-green form-label">Annual Revenue Range</label>
                                            <select name="revenue" value={formData.revenue} onChange={handleInputChange}>
                                                <option value="">Select range...</option>
                                                <option value="Below $1M">Below $1M</option>
                                                <option value="$1M to $3M">$1M to $3M</option>
                                                <option value="$3M to $7M">$3M to $7M</option>
                                                <option value="$7M to $15M">$7M to $15M</option>
                                                <option value="$15M to $20M">$15M to $20M</option>
                                                <option value="Above $20M">Above $20M</option>
                                            </select>
                                        </div>
                                        <div className="input-group">
                                            <label className="font-mono text-green form-label">Team Size</label>
                                            <select name="teamSize" value={formData.teamSize} onChange={handleInputChange}>
                                                <option value="">Select size...</option>
                                                <option value="1 to 10">1 to 10</option>
                                                <option value="11 to 30">11 to 30</option>
                                                <option value="31 to 75">31 to 75</option>
                                                <option value="76 to 150">76 to 150</option>
                                                <option value="150 and above">150 and above</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="input-group">
                                        <label className="font-mono text-green form-label">Current Tool Stack</label>
                                        <input type="text" name="toolStack" placeholder="e.g. HubSpot, Slack, Notion, QuickBooks" value={formData.toolStack} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-grid">
                                        <div className="input-group">
                                            <label className="font-mono text-green form-label">Preferred Contact Method</label>
                                            <select name="contactMethod" value={formData.contactMethod} onChange={handleInputChange}>
                                                <option value="Email">Email</option>
                                                <option value="Phone call">Phone call</option>
                                                <option value="Video call">Video call</option>
                                                <option value="WhatsApp">WhatsApp</option>
                                            </select>
                                        </div>
                                        <div className="input-group">
                                            <label className="font-mono text-green form-label">Phone Number (Optional)</label>
                                            <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
                                        </div>
                                    </div>

                                    <div className="form-divider"></div>

                                    <div className="payment-notice font-mono text-muted bg-surface">
                                        What happens next: After submitting this form you will be directed to complete payment of $3,500 via secure checkout. Once payment is confirmed, a member of our senior team will contact you within one business day to begin the intake process. Your information is treated with full confidentiality.
                                    </div>

                                    {submitError && (
                                        <div className="error-message font-mono" style={{ color: '#ff6b6b', fontSize: '13px', marginBottom: '16px', textAlign: 'center' }}>
                                            {submitError}
                                        </div>
                                    )}

                                    <div className="modal-actions">
                                        <button className="btn-primary btn-gold w-full" onClick={handleSubmit} disabled={isSubmitting}>
                                            {isSubmitting ? 'Processing...' : 'Proceed to Payment →'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default App;
