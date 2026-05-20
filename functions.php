<?php
/**
 * Mystic Insights theme setup.
 *
 * @package MysticInsights
 */

if (!defined('ABSPATH')) {
    exit;
}

function mystic_insights_setup() {
    load_theme_textdomain('mystic-insights', get_template_directory() . '/languages');
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script'));
    add_theme_support('custom-logo', array(
        'height' => 80,
        'width' => 240,
        'flex-height' => true,
        'flex-width' => true,
    ));
    add_theme_support('align-wide');

    register_nav_menus(array(
        'primary' => __('Primary Menu', 'mystic-insights'),
        'footer' => __('Footer Menu', 'mystic-insights'),
    ));
}
add_action('after_setup_theme', 'mystic_insights_setup');

function mystic_insights_assets() {
    wp_enqueue_style(
        'mystic-insights-google-fonts',
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap',
        array(),
        null
    );

    wp_enqueue_style('mystic-insights-style', get_stylesheet_uri(), array('mystic-insights-google-fonts'), wp_get_theme()->get('Version'));

    wp_enqueue_script(
        'mystic-insights-main',
        get_template_directory_uri() . '/assets/js/main.js',
        array(),
        wp_get_theme()->get('Version'),
        true
    );
}
add_action('wp_enqueue_scripts', 'mystic_insights_assets');

function mystic_insights_fallback_menu() {
    echo '<a href="#services">Services</a>';
    echo '<a href="#how-it-works">How it works</a>';
    echo '<a href="#pricing">Pricing</a>';
    echo '<a href="#testimonials">Reviews</a>';
}

function mystic_insights_year() {
    return esc_html(date_i18n('Y'));
}
