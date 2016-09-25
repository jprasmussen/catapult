<?php
/**
 * Override or insert variables for the breadcrumb theme function.
 *
 * @param $variables
 *   An array of variables to pass to the theme function.
 * @param $hook
 *   The name of the theme hook being called ("breadcrumb" in this case).
 *
 * @see catapult_breadcrumb()
 */
function catapult_preprocess_breadcrumb(&$variables, $hook) {
  // Define variables for the breadcrumb-related theme settings. This is done
  // here so that sub-themes can dynamically change the settings under
  // particular conditions in a preprocess function of their own.


  // Add the title of the page to the end of the breadcrumb list.
  // if (theme_get_setting('catapult_breadcrumb_title')) {
    $item = menu_get_item();
    if (!empty($item['tab_parent'])) {
      // If we are on a non-default tab, use the tab's title.
      $variables['breadcrumb'][] = check_plain($item['title']);
    }
    else {
      $variables['breadcrumb'][] = drupal_get_title();
    }
    // Turn off the trailing separator.
    $variables['display_trailing_separator'] = FALSE;
  // }

  // Provide a navigational heading to give context for breadcrumb links to
  // screen-reader users.
  if (empty($variables['title'])) {
    $variables['title'] = t('You are here');
  }
}

/**
 * Return a themed breadcrumb trail.
 *
 * @param $variables
 *   - title: An optional string to be used as a navigational heading to give
 *     context for breadcrumb links to screen-reader users.
 *   - title_attributes_array: Array of HTML attributes for the title. It is
 *     flattened into a string within the theme function.
 *   - breadcrumb: An array containing the breadcrumb links.
 *   - display_breadcrumb: A boolean indicating whether the breadcrumbs should
 *     be displayed.
 *   - breadcrumb_separator: A string representing the text to be used as the
 *     breadcrumb separator.
 *   - display_trailing_separator: A boolean indicating whether a trailing
 *     seperator should be added at the end of the breadcrumbs.
 *
 * @return
 *   A string containing the breadcrumb output.
 */
function catapult_breadcrumb($variables) {
  $output = '';

  // Determine if we are to display the breadcrumb.
  // if ($variables['display_breadcrumb'] && !empty($variables['breadcrumb'])) {
    $variables['title_attributes_array']['class'][] = 'breadcrumb--title';
    $separator = '<span class="breadcrumb--separator">&nbsp;//&nbsp;</span>';
    // Build the breadcrumb trail.
    $output = '<nav class="breadcrumb" role="navigation">';
    // $output .= '<h2' . drupal_attributes($variables['title_attributes_array']) . '>' . $variables['title'] . '</h2>';
    $output .= '<ol class="breadcrumb--list"><li class="breadcrumb--item">';
    $output .= implode($separator . '</li><li class="breadcrumb--item">', $variables['breadcrumb']);
    if ($variables['display_trailing_separator']) {
      $output .= $separator;
    }
    $output .= '</li></ol></nav>';
  // }

  return $output;
}

   /**
    * Returns HTML for primary and secondary local tasks.
    *
    * @ingroup themeable
    */
   function catapult_menu_local_tasks(&$variables) {
     $output = '';

     if (!empty($variables['primary'])) {
       // $variables['primary']['#prefix'] = '<div class="tabs--primary-wrapper"><span class="tabs--primary-toggle"><span class="icon"></span>' . t('Manage') . '</span>';
       $variables['primary']['#prefix'] = '<div class="tabs--primary-wrapper">';
       $variables['primary']['#prefix'] .= '<ul class="tabs--primary">';
       $variables['primary']['#suffix'] = '</ul></div>';
       $output .= drupal_render($variables['primary']);
     }
     if (!empty($variables['secondary'])) {
       $variables['secondary']['#prefix'] = '<h2 class="element-invisible">' . t('Secondary tabs') . '</h2>';
       $variables['secondary']['#prefix'] .= '<ul class="tabs tabs--secondary links--inline">';
       $variables['secondary']['#suffix'] = '</ul>';
       $output .= drupal_render($variables['secondary']);
     }

     return $output;
   }
