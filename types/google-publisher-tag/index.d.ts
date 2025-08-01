/**
 * The global namespace the Google Publisher Tag uses for its API.
 */
declare namespace googletag {
    /**
     * Returns a reference to the {@link PubAdsService}.
     *
     * @return The Publisher Ads service.
     */
    function pubads(): PubAdsService;

    /**
     * Returns a reference to the {@link CompanionAdsService}.
     *
     * @return The Companion Ads service.
     */
    function companionAds(): CompanionAdsService;

    /**
     * Reference to the global command queue for asynchronous execution of
     * GPT-related calls.
     *
     * The `googletag.cmd` variable is initialized to an empty
     * JavaScript array by the GPT tag syntax on the page, and
     * `cmd.push` is the standard `Array.push` method that
     * adds an element to the end of the array. When the GPT JavaScript is loaded,
     * it looks through the array and executes all the functions in order. The
     * script then replaces `cmd` with a {@link CommandArray} object
     * whose push method is defined to execute the function argument passed to it.
     * This mechanism allows GPT to reduce perceived latency by fetching the
     * JavaScript asynchronously while allowing the browser to continue rendering
     * the page.
     *
     * @example
     *   googletag.cmd.push(() => {
     *     googletag.defineSlot('/1234567/sports', [160, 600])!
     *              .addService(googletag.pubads());
     *   });
     */
    const cmd: Array<(this: typeof globalThis) => void> | CommandArray;

    /**
     * Returns the current version of GPT.
     *
     * @see [GPT version history](https://developers.google.com/publisher-tag/versions)
     * @return The currently executing GPT version string.
     */
    function getVersion(): string;

    /**
     * Reference to the secure signal providers array.
     *
     * The secure signal providers array accepts a sequence of signal-generating
     * functions and invokes them in order. It is intended to replace a standard
     * array that is used to enqueue signal-generating functions to be invoked
     * once GPT is loaded.
     *
     * @example
     *   window.googletag = window.googletag || {cmd: []};
     *   googletag.secureSignalProviders = googletag.secureSignalProviders || [];
     *   googletag.secureSignalProviders.push({
     *     id: 'collector123',
     *     collectorFunction: () => { return Promise.resolve('signal'); }
     *   });
     *
     * @see [Share secure signals with bidders](https://support.google.com/admanager/answer/10488752)
     */
    let secureSignalProviders:
        | secureSignals.SecureSignalProvider[]
        | secureSignals.SecureSignalProvidersArray
        | undefined;

    /**
     * Constructs an ad slot with a given ad unit path and size and associates it
     * with the ID of a div element on the page that will contain the ad.
     *
     * @example
     *   googletag.defineSlot('/1234567/sports', [728, 90], 'div-1');
     *
     * @see [Get Started with Google Publisher Tags](https://developers.google.com/publisher-tag/guides/get-started)
     * @param adUnitPath Full [ad unit
     *     path](https://developers.google.com/publisher-tag/guides/get-started#ad-unit-path)
     *     with the network code and unit code.
     * @param  size Width and height of the added slot.
     *     This is the size that is used in the ad request if no responsive size
     *     mapping is provided or the size of the viewport is smaller than the
     *     smallest size provided in the mapping.
     * @param div ID of the div that will contain this ad unit.
     * @return The newly created slot, or `null` if a slot cannot be
     *     created.
     */
    function defineSlot(adUnitPath: string, size: GeneralSize, div?: string): Slot | null;

    /**
     * Constructs an out-of-page ad slot with the given ad unit path.
     *
     * For custom out-of-page ads, `div` is the ID
     * of the div element that will contain the ad. See the article on
     * [out-of-page
     * creatives](https://support.google.com/admanager/answer/6088046) for more
     * details.
     *
     * For GPT managed out-of-page ads, `div` is a
     * supported {@link enums.OutOfPageFormat | OutOfPageFormat}.
     *
     * @example
     *   // Define a custom out-of-page ad slot.
     *   googletag.defineOutOfPageSlot('/1234567/sports', 'div-1');
     *
     *   // Define a GPT managed web interstitial ad slot.
     *   googletag.defineOutOfPageSlot('/1234567/sports',
     *                                 googletag.enums.OutOfPageFormat.INTERSTITIAL);
     *
     * @see [Display a rewarded ad](https://developers.google.com/publisher-tag/samples/display-rewarded-ad)
     * @see [Display a web interstitial ad](https://developers.google.com/publisher-tag/samples/display-web-interstitial-ad)
     * @see [Display an anchor ad](https://developers.google.com/publisher-tag/samples/display-anchor-ad)
     * @see [Display an out-of-page ad](https://developers.google.com/publisher-tag/samples/display-out-of-page-ad)
     * @param adUnitPath Full [ad unit
     *     path](https://developers.google.com/publisher-tag/guides/get-started#ad-unit-path)
     *     with the network code and ad unit code.
     * @param div ID of the div that  will contain this ad unit or
     *     OutOfPageFormat.
     * @return The newly created slot, or `null` if a slot cannot be
     *     created.
     */
    function defineOutOfPageSlot(adUnitPath: string, div?: string | enums.OutOfPageFormat): Slot | null;

    /**
     * Instructs slot services to render the slot. Each ad slot should only be
     * displayed once per page. All slots must be defined and have a service
     * associated with them before being displayed. The display call must not
     * happen until the element is present in the DOM. The usual way to achieve
     * that is to place it within a script block within the div element named in
     * the method call.
     *
     * If single request architecture (SRA) is being used, all unfetched
     * ad slots at the time this method is called will be fetched at once. To
     * force an ad slot not to display, the entire div must be removed.
     *
     * @example
     *   &lt;div id="div-1" style="width: 728px; height: 90px"&gt;
     *     &lt;script type="text/javascript"&gt;
     *       googletag.cmd.push(() => {
     *         googletag.display('div-1');
     *       });
     *     &lt;/script&gt;
     *   &lt;/div&gt;
     *
     * @see [Get Started with Google Publisher Tags](https://developers.google.com/publisher-tag/guides/get-started)
     * @see [Display a test ad](https://developers.google.com/publisher-tag/samples/display-test-ad)
     * @see [Control ad loading and refresh](https://developers.google.com/publisher-tag/guides/control-ad-loading)
     * @param  divOrSlot Either the ID of the div element containing the ad slot
     *     or the div element, or the slot object. If a div element is provided,
     *     it must have an 'id' attribute which matches the ID passed into
     *     {@link defineSlot}.
     */
    function display(divOrSlot: string | Element | Slot): void;

    /**
     * Enables all GPT services that have been defined for ad slots
     * on the page.
     */
    function enableServices(): void;

    /**
     * Disables the Google Publisher Console.
     *
     * @see [Google Publisher Console](https://developers.google.com/publisher-tag/guides/publisher-console)
     */
    function disablePublisherConsole(): void;

    /**
     * Destroys the given slots, removing all related objects and references of
     * those slots from GPT. This API does not support passback slots and
     * companion slots.
     *
     * Calling this API on a slot clears the ad and removes the slot object from
     * the internal state maintained by GPT. Calling any more functions on the
     * slot object will result in undefined behavior. Note the browser may still
     * not free the memory associated with that slot if a reference to it is
     * maintained by the publisher page. Calling this API makes the div associated
     * with that slot available for reuse.
     *
     * In particular, destroying a slot removes the ad from GPT's
     * [long-lived pageview](https://support.google.com/admanager/answer/183281),
     * so future requests will not be influenced by roadblocks or competitive
     * exclusions involving this ad. Failure to call this function before removing
     * a slot's div from the page will result in undefined behavior.
     *
     * @example
     *   // The calls to construct an ad and display contents.
     *   const slot1 =
     *       googletag.defineSlot('/1234567/sports', [728, 90], 'div-1')!;
     *   googletag.display('div-1');
     *   const slot2 =
     *       googletag.defineSlot('/1234567/news', [160, 600], 'div-2')!;
     *   googletag.display('div-2');
     *
     *   // This call to destroy only slot1.
     *   googletag.destroySlots([slot1]);
     *
     *   // This call to destroy both slot1 and slot2.
     *   googletag.destroySlots([slot1, slot2]);
     *
     *   // This call to destroy all slots.
     *   googletag.destroySlots();
     *
     * @param slots The array of slots to destroy. Array is optional; all slots
     *     will be destroyed if it is unspecified.
     * @return `true` if slots have been destroyed, `false`
     *     otherwise.
     */
    function destroySlots(slots?: Slot[]): boolean;

    /**
     * Creates a new {@link SizeMappingBuilder}.
     *
     * @see [Ad sizes: Responsive ads](https://developers.google.com/publisher-tag/guides/ad-sizes#responsive_ads)
     * @return A new builder.
     */
    function sizeMapping(): SizeMappingBuilder;

    /**
     * Flag indicating that the GPT API is loaded and ready to be called.
     * This property will be simply `undefined` until the API is ready.
     *
     * Note that the recommended way of handling async is to use
     * {@link cmd | googletag.cmd} to queue callbacks for when GPT is ready. These
     * callbacks do not have to check googletag.apiReady as they are guaranteed to
     * execute once the API is set up.
     *
     * @example
     *  &lt;script&gt;
     *    if (window.googletag && googletag.apiReady) {
     *      // GPT API can be called safely.
     *    }
     *  &lt;/script&gt;
     */
    const apiReady: boolean | undefined;

    /**
     * Flag indicating that
     * {@link PubAdsService} is enabled, loaded and fully operational. This
     * property will be simply `undefined` until {@link enableServices}
     * is called and {@link PubAdsService} is loaded and initialized.
     */
    const pubadsReady: boolean | undefined;

    /**
     * Opens the Google Publisher Console.
     *
     * @example
     *   // Calling with div ID.
     *   googletag.openConsole('div-1');
     *
     *   // Calling without div ID.
     *   googletag.openConsole();
     *
     * @see [Google Publisher Console](https://developers.google.com/publisher-tag/guides/publisher-console)
     * @param div An ad slot div ID. This value is optional. When provided, the
     * Publisher Console will attempt to open with details of the specified ad
     * slot in view.
     */
    function openConsole(div?: string): void;

    /**
     * Sets the title for all ad container iframes created by
     * {@link PubAdsService}, from this point onwards.
     *
     * @example
     *   googletag.setAdIframeTitle('title');
     *
     * @param title The new title for all ad container iframes.
     */
    function setAdIframeTitle(title: string): void;

    /**
     * Sets general configuration options for the page.
     */
    function setConfig(config: config.PageSettingsConfig): void;

    /**
     * Gets general configuration options for the page set by {@link setConfig}.
     *
     * Not all `setConfig()` properties are supported by this method. Supported
     * properties are:
     * - {@link config.PageSettingsConfig.adsenseAttributes | `adsenseAttributes`}
     * - {@link config.PageSettingsConfig.disableInitialLoad | `disableInitialLoad`}
     * - {@link config.PageSettingsConfig.targeting | `targeting`}
     *
     * @example
     *   // Get the value of the `targeting` setting.
     *   const targetingConfig = googletag.getConfig('targeting');
     *
     *   // Get the value of the `adsenseAttributes` and `disableInitialLoad` settings.
     *   const config = googletag.getConfig(['adsenseAttributes', 'disableInitialLoad']);
     *
     * @param keys The keys of the configuration options to get.
     * @return The configuration options for the slot.
     */
    function getConfig(
        keys: string | string[],
    ): Pick<config.PageSettingsConfig, "adsenseAttributes" | "disableInitialLoad" | "targeting">;

    /**
     * The command array accepts a sequence of functions and invokes them in
     * order. It is intended to replace a standard array that is used to enqueue
     * functions to be invoked once GPT is loaded.
     */
    interface CommandArray {
        /**
         * Executes the sequence of functions specified in the arguments in order.
         * @example
         *   googletag.cmd.push(() => {
         *     googletag.defineSlot('/1234567/sports', [160, 600])!
         *              .addService(googletag.pubads());
         *   });
         *  @param f A JavaScript function to be executed. The runtime binding will
         * always be
         * [`globalThis`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/globalThis).
         * Consider passing an arrow function to retain the `this` value
         * of the enclosing lexical context.
         *  @return The number of commands processed so far. This is compatible with
         * `Array.push`'s return value (the current length of the array).
         */
        push(...f: Array<(this: typeof globalThis) => void>): number;
    }

    /**
     * Companion Ads service. This service is used by video ads to show companion
     * ads.
     *
     * @see [Companion ads for video and audio](https://support.google.com/admanager/answer/1191131)
     */
    interface CompanionAdsService extends Service {
        /**
         * Sets whether companion slots that have not been filled will be
         * automatically backfilled.
         *
         * This method can be called multiple times during the page's lifetime to
         * turn backfill on and off.
         * Only slots that are also registered with the {@link PubAdsService} will be
         * backfilled. Due to policy restrictions, this method is not designed to fill
         * empty companion slots when an Ad Exchange video is served.
         *
         * @example
         *   googletag.companionAds().setRefreshUnfilledSlots(true);
         *
         * @param value `true` to automatically backfill unfilled slots,
         *     `false` to leave them unchanged.
         */
        setRefreshUnfilledSlots(value: boolean): void;
    }

    /**
     * Configuration object for privacy settings.
     *
     * @see [Configure privacy settings](https://developers.google.com/publisher-tag/samples/configure-privacy)
     */
    interface PrivacySettingsConfig {
        /**
         * Enables serving to run in
         * [restricted processing
         * mode](https://support.google.com/admanager/answer/9598414) to aid in
         * publisher regulatory compliance needs.
         */
        restrictDataProcessing?: boolean;

        /**
         * Indicates whether the page should be
         * [treated as
         * child-directed](https://support.google.com/admanager/answer/3671211). Set
         * to `null` to clear the configuration.
         */
        childDirectedTreatment?: boolean | null;

        /**
         * Indicates whether to mark ad requests as coming from users
         * [under the age of
         * consent](https://support.google.com/admanager/answer/9004919). Set to
         * `null` to clear the configuration.
         */
        underAgeOfConsent?: boolean | null;

        /**
         * Enables serving to run in
         * [limited ads](https://support.google.com/admanager/answer/9882911) mode to
         * aid in publisher regulatory compliance needs.
         *
         * You can instruct GPT to request limited ads in two ways:
         *
         * - Automatically, by using a signal from an
         *   [IAB TCF v2.0](https://iabeurope.eu/tcf-2-0/) consent management
         *   platform.
         * - Manually, by setting the value of this field to `true`.
         *
         * Manually configuring limited ads is only possible when GPT is loaded from
         * the [limited ads
         * URL](https://developers.google.com/publisher-tag/guides/general-best-practices#load_from_an_official_source).
         * Attempting to modify this setting when GPT has been loaded from the
         * standard URL will generate a [Publisher Console
         * warning](http://developers.google.com/publisher-tag/guides/publisher-console-messages#147).
         *
         * Note that it is not necessary to manually enable limited ads when a CMP is
         * in use.
         *
         * @example
         *   // Manually enable limited ads serving.
         *   // GPT must be loaded from the limited ads URL to configure this setting.
         *   googletag.pubads().setPrivacySettings({
         *     limitedAds: true,
         *   });
         *
         * @see [Display a limited ad](https://developers.google.com/publisher-tag/samples/display-limited-ad)
         */
        limitedAds?: boolean;

        /**
         * Enables serving to run in
         * [non-personalized ads](https://support.google.com/admanager/answer/9005435)
         * mode to aid in publisher regulatory compliance needs.
         */
        nonPersonalizedAds?: boolean;

        /**
         * Indicates whether requests represent purchased or organic traffic.
         * This value populates the
         * [Traffic source](https://support.google.com/admanager/answer/11233407)
         * dimension in Ad Manager reporting. If not set, traffic source defaults to
         * `undefined` in reporting.
         *
         * @example
         *   // Indicate requests represent organic traffic.
         *   googletag.pubads().setPrivacySettings({
         *     trafficSource: googletag.enums.TrafficSource.ORGANIC
         *   });
         *
         *   // Indicate requests represent purchased traffic.
         *   googletag.pubads().setPrivacySettings({
         *     trafficSource: googletag.enums.TrafficSource.PURCHASED
         *   });
         */
        trafficSource?: enums.TrafficSource;
    }

    /**
     * Publisher Ads service. This service is used to fetch and show ads from your
     * Google Ad Manager account.
     */
    interface PubAdsService extends Service {
        /**
         * Sets custom targeting parameters for a given key that apply to all
         * Publisher Ads service ad slots. Calling this multiple times for the same
         * key will overwrite old values. These keys are defined in your Google Ad
         * Manager account.
         *
         * @example
         *   // Example with a single value for a key.
         *   googletag.pubads().setTargeting('interests', 'sports');
         *
         *   // Example with multiple values for a key inside in an array.
         *   googletag.pubads().setTargeting('interests', ['sports', 'music']);
         *
         * @see [Key-value targeting](https://developers.google.com/publisher-tag/guides/key-value-targeting)
         * @param key Targeting parameter key.
         * @param value Targeting parameter value or array of values.
         * @return The service object on which the method was called.
         * @deprecated Use {@link googletag.config.PageSettingsConfig.targeting | PageSettingsConfig.targeting} instead.
         */
        setTargeting(key: string, value: string | string[]): PubAdsService;

        /**
         * Clears custom targeting parameters for a specific key or for all keys.
         *
         * @example
         *   googletag.pubads().setTargeting('interests', 'sports');
         *   googletag.pubads().setTargeting('colors', 'blue');
         *   googletag.pubads().setTargeting('fruits', 'apple');
         *
         *   googletag.pubads().clearTargeting('interests');
         *   // Targeting 'colors' and 'fruits' are still present, while 'interests'
         *   // was cleared.
         *
         *   googletag.pubads().clearTargeting();
         *   // All targeting has been cleared.
         *
         * @see [Key-value targeting](https://developers.google.com/publisher-tag/guides/key-value-targeting)
         * @param key Targeting parameter key. The key is optional; all targeting
         *     parameters will be cleared if it is unspecified.
         * @return The service object on which the method was called.
         * @deprecated Use {@link googletag.config.PageSettingsConfig.targeting | PageSettingsConfig.targeting} instead.
         */
        clearTargeting(key?: string): PubAdsService;

        /**
         * Returns a specific custom service-level targeting parameter that has been
         * set.
         *
         * @example
         *   googletag.pubads().setTargeting('interests', 'sports');
         *
         *   googletag.pubads().getTargeting('interests');
         *   // Returns ['sports'].
         *
         *   googletag.pubads().getTargeting('age');
         *   // Returns [] (empty array).
         *
         * @param key The targeting key to look for.
         * @return The values associated with this key, or an empty array if there
         *     is no such key.
         * @deprecated Use {@link googletag.getConfig} instead.
         */
        getTargeting(key: string): string[];

        /**
         * Returns the list of all custom service-level targeting keys that have
         * been set.
         *
         * @example
         *   googletag.pubads().setTargeting('interests', 'sports');
         *   googletag.pubads().setTargeting('colors', 'blue');
         *
         *   googletag.pubads().getTargetingKeys();
         *   // Returns ['interests', 'colors'].
         *
         * @return Array of targeting keys. Ordering is undefined.
         * @deprecated Use {@link googletag.getConfig} instead.
         */
        getTargetingKeys(): string[];

        /**
         * Sets a page-level ad category exclusion for the given label name.
         *
         * @example
         *   // Label = AirlineAd.
         *   googletag.pubads().setCategoryExclusion('AirlineAd');
         *
         * @see [Custom labels to block ads](https://support.google.com/admanager/answer/3238504)
         * @param categoryExclusion The ad category exclusion label to add.
         * @return The service object on which the method was called.
         * @deprecated Use {@link googletag.config.PageSettingsConfig.categoryExclusion | PageSettingsConfig.categoryExclusion} instead.
         */
        setCategoryExclusion(categoryExclusion: string): PubAdsService;

        /**
         * Clears all page-level ad category exclusion labels. This is useful if you
         * want to refresh the slot.
         *
         * @example
         *   // Set category exclusion to exclude ads with 'AirlineAd' labels.
         *   googletag.pubads().setCategoryExclusion('AirlineAd');
         *
         *   // Make ad requests. No ad with 'AirlineAd' label will be returned.
         *
         *   // Clear category exclusions so all ads can be returned.
         *   googletag.pubads().clearCategoryExclusions();
         *
         *   // Make ad requests. Any ad can be returned.
         *
         * @see [Custom labels to block ads](https://support.google.com/admanager/answer/3238504)
         * @return The service object on which the method was called.
         * @deprecated Use {@link googletag.config.PageSettingsConfig.categoryExclusion | PageSettingsConfig.categoryExclusion} instead.
         */
        clearCategoryExclusions(): PubAdsService;

        /**
         * Disables requests for ads on page load, but allows ads to be requested
         * with a {@link PubAdsService.refresh} call. This should be set prior to
         * enabling the service. Async mode must be used; otherwise it will be
         * impossible to request ads using `refresh`.
         *
         * @see [Control ad loading and refresh](https://developers.google.com/publisher-tag/guides/control-ad-loading)
         * @see [Control SRA batching](https://developers.google.com/publisher-tag/samples/control-sra-batching)
         * @deprecated Use {@link googletag.config.PageSettingsConfig.disableInitialLoad | PageSettingsConfig.disableInitialLoad} instead.
         */
        disableInitialLoad(): void;

        /**
         * Returns whether or not initial requests for ads was successfully disabled
         * by a previous {@link PubAdsService.disableInitialLoad} call.
         *
         * @return Returns `true` if a previous call to
         *     {@link PubAdsService.disableInitialLoad} was successful, `false`
         *     otherwise.
         * @deprecated Use {@link googletag.getConfig} instead.
         */
        isInitialLoadDisabled(): boolean;

        /**
         * Enables single request mode for fetching multiple ads at the same time.
         * This requires all Publisher Ads slots to be defined and added to the
         * PubAdsService prior to enabling the service. Single request mode must be
         * set before the service is enabled.
         *
         * @see [Ads best practices: Use Single Request Architecture correctly](https://developers.google.com/publisher-tag/guides/ad-best-practices#use_single_request_architecture_correctly)
         * @see [Control SRA batching](https://developers.google.com/publisher-tag/samples/control-sra-batching)
         * @return Returns `true` if single request mode was enabled and
         *     `false` if it is impossible to enable single request mode
         *     because the method was called after the service was enabled.
         * @deprecated Use {@link googletag.config.PageSettingsConfig.singleRequest | PageSettingsConfig.singleRequest} instead.
         */
        enableSingleRequest(): boolean;

        /**
         * Enables and disables horizontal centering of ads. Centering is disabled
         * by default. In legacy gpt_mobile.js, centering is enabled by default.
         *
         * This method should be invoked before calling `display` or
         * `refresh` because only ads that are requested after calling
         * this method will be centered.
         *
         * @example
         *   // Make ads centered.
         *   googletag.pubads().setCentering(true);
         *
         * @param centerAds `true` to center ads, `false` to left-align them.
         * @deprecated Use {@link googletag.config.PageSettingsConfig.centering | PageSettingsConfig.centering}
         *  instead.
         */
        setCentering(centerAds: boolean): void;

        /**
         * Fetches and displays new ads for specific or all slots on the page. Works
         * only in asynchronous rendering mode.
         *
         * For proper behavior across all browsers, calling `refresh`
         * must be preceded by a call to `display` the ad slot. If the
         * call to `display` is omitted, refresh may behave unexpectedly.
         * If desired, the {@link PubAdsService.disableInitialLoad}
         * method can be used to stop `display` from fetching an ad.
         *
         * Refreshing a slot removes the old ad from GPT's
         * [long-lived pageview](https://support.google.com/admanager/answer/183281),
         * so future requests will not be influenced by roadblocks or competitive
         * exclusions involving that ad.
         *
         * @example
         *   const slot1 =
         *       googletag.defineSlot('/1234567/sports', [728, 90], 'div-1')!;
         *   googletag.display('div-1');
         *   const slot2 =
         *       googletag.defineSlot('/1234567/news', [160, 600], 'div-2')!;
         *   googletag.display('div-2');
         *
         *   // This call to refresh fetches a new ad for slot1 only.
         *   googletag.pubads().refresh([slot1]);
         *
         *   // This call to refresh fetches a new ad for both slot1 and slot2.
         *   googletag.pubads().refresh([slot1, slot2]);
         *
         *   // This call to refresh fetches a new ad for each slot.
         *   googletag.pubads().refresh();
         *
         *   // This call to refresh fetches a new ad for slot1, without changing
         *   // the correlator.
         *   googletag.pubads().refresh([slot1], {changeCorrelator: false});
         *
         *   // This call to refresh fetches a new ad for each slot, without
         *   // changing the correlator.
         *   googletag.pubads().refresh(null, {changeCorrelator: false});
         *
         * @see [Control ad loading and refresh](https://developers.google.com/publisher-tag/guides/control-ad-loading)
         * @see [Refresh ad slots](https://developers.google.com/publisher-tag/samples/refresh)
         * @param  slots The slots to refresh. Array is  optional; all slots
         *     will be refreshed if it is unspecified.
         * @param options Configuration options associated with this refresh
         *     call.
         *
         * - `changeCorrelator`
         *
         *     Specifies whether or not a new correlator is to be generated for
         *     fetching ads. Our ad servers maintain this correlator value briefly
         *     (currently for 30 seconds, but subject to change), such that requests
         *     with the same correlator received close together will be considered
         *     a single page view. By default a new correlator is generated for every
         *     refresh.
         *
         *     **Note:** this option has no effect on GPT's [long-lived
         *     pageview](https://support.google.com/admanager/answer/183281), which
         *     automatically reflects the ads currently on the page and has no
         *     expiration time.
         */
        refresh(
            slots?: Slot[] | null,
            options?: {
                changeCorrelator: boolean;
            },
        ): void;

        /**
         * Signals to GPT that video ads will be present on the page. This enables
         * competitive exclusion constraints on display and video ads. If the video
         * content is known, call {@link PubAdsService.setVideoContent} in order to be
         * able to use content exclusion for display ads.
         * @deprecated Use {@link googletag.config.PageSettingsConfig.videoAds | PageSettingsConfig.videoAds} instead.
         */
        enableVideoAds(): void;

        /**
         * Sets the video content information to be sent along with the ad requests
         * for targeting and content exclusion purposes. Video ads will be
         * automatically enabled when this method is called. For
         * `videoContentId` and `videoCmsId`, use the values
         * that are provided to the Google Ad Manager content ingestion service.
         *
         * @see [VAST ad tag URL parameters](https://support.google.com/admanager/answer/1068325)
         * @param videoContentId The video content ID.
         * @param videoCmsId The video CMS ID.
         * @deprecated Use {@link googletag.config.PageSettingsConfig.videoAds | PageSettingsConfig.videoAds} instead.
         */
        setVideoContent(videoContentId: string, videoCmsId: string): void;

        /**
         * Enables collapsing of slot divs so that they don't take up any space on
         * the page when there is no ad content to display. This mode must be set
         * before the service is enabled.
         *
         * @see [Collapse empty ad slots](https://developers.google.com/publisher-tag/samples/collapse-empty-ad-slots)
         * @see [Minimize layout shift](https://developers.google.com/publisher-tag/guides/minimize-layout-shift)
         * @param collapseBeforeAdFetch Whether to collapse the slots even before
         *     the ads are fetched. This parameter is optional; if not provided,
         *     `false` will be used as the default value.
         * @return Returns `true` if div collapse mode was enabled and
         *     `false` if it is impossible to enable collapse mode
         *     because the method was called after the service was enabled.
         * @deprecated Use {@link googletag.config.PageSettingsConfig.collapseDiv | PageSettingsConfig.collapseDiv} instead.
         */
        collapseEmptyDivs(collapseBeforeAdFetch?: boolean): boolean;

        /**
         * Removes the ads from the given slots and replaces them with blank
         * content. The slots will be marked as unfetched.
         *
         * In particular, clearing a slot removes the ad from GPT's [long-lived
         * pageview](https://support.google.com/admanager/answer/183281), so future
         * requests will not be influenced by roadblocks or competitive exclusions
         * involving this ad.
         *
         * @example
         *   const slot1 =
         *       googletag.defineSlot('/1234567/sports', [728, 90], 'div-1')!;
         *   googletag.display('div-1');
         *   const slot2 =
         *       googletag.defineSlot('/1234567/news', [160, 600], 'div-2')!;
         *   googletag.display('div-2');
         *
         *   // This call to clear only slot1.
         *   googletag.pubads().clear([slot1]);
         *
         *   // This call to clear both slot1 and slot2.
         *   googletag.pubads().clear([slot1, slot2]);
         *
         *   // This call to clear all slots.
         *   googletag.pubads().clear();
         *
         * @param slots The array of slots to clear. Array is optional; all slots
         *     will be cleared if it is unspecified.
         * @return Returns `true` if slots have been cleared,
         *     `false` otherwise.
         */
        clear(slots?: Slot[]): boolean;

        /**
         * Passes location information from websites so you can geo-target line
         * items to specific locations.
         *
         * @example
         *   // Postal code:
         *   googletag.pubads().setLocation("10001,US")
         *
         * @param address Freeform address.
         * @return The service object on which the method was called.
         * @deprecated Use {@link googletag.config.PageSettingsConfig.location | PageSettingsConfig.location} instead.
         */
        setLocation(address: string): PubAdsService;

        /**
         * Sets the value for the publisher-provided ID.
         *
         * @example
         *   googletag.pubads()
         *            .setPublisherProvidedId('12JD92JD8078S8J29SDOAKC0EF230337');
         *
         * @see [About publisher provided identifiers](https://support.google.com/admanager/answer/2880055)
         * @param ppid An alphanumeric ID provided by the publisher. Must be between
         *     32 and 150 characters.
         * @return The service object on which the method was called.
         */
        setPublisherProvidedId(ppid: string): PubAdsService;

        /**
         * Sets values for AdSense attributes that apply to all ad slots under the
         * Publisher Ads service.
         *
         * Calling this more than once for the same key will override previously set
         * values for that key. All values must be set before calling
         * `display` or `refresh`.
         *
         * @example
         *   googletag.pubads().set('adsense_background_color', '#FFFFFF');
         *
         * @see [AdSense Attributes](https://developers.google.com/publisher-tag/adsense_attributes)
         * @param key The name of the attribute.
         * @param value Attribute value.
         * @return The service object on which the method was called.
         * @deprecated Use {@link googletag.config.PageSettingsConfig.adsenseAttributes | PageSettingsConfig.adsenseAttributes} instead.
         */
        set(key: string, value: string): PubAdsService;

        /**
         * Returns the value for the AdSense attribute associated with the given
         * key.
         *
         * @example
         *   googletag.pubads().set('adsense_background_color', '#FFFFFF');
         *   googletag.pubads().get('adsense_background_color');
         *   // Returns '#FFFFFF'.
         *
         * @see [AdSense Attributes](https://developers.google.com/publisher-tag/adsense_attributes)
         * @param key Name of the attribute to look for.
         * @return Current value for the attribute key, or `null` if the
         *     key is not present.
         * @deprecated Use {@link googletag.getConfig} instead.
         */
        get(key: string): string | null;

        /**
         * Returns the attribute keys that have been set on this service.
         *
         * @example
         *   googletag.pubads().set('adsense_background_color', '#FFFFFF');
         *   googletag.pubads().set('adsense_border_color', '#AABBCC');
         *   googletag.pubads().getAttributeKeys();
         *   // Returns ['adsense_background_color', 'adsense_border_color'].
         *
         * @return Array of attribute keys set on this service. Ordering is
         *     undefined.
         * @deprecated Use {@link googletag.getConfig} instead.
         */
        getAttributeKeys(): string[];

        /**
         * Constructs and displays an ad slot with the given ad unit path and size.
         * This method does not work with single request mode.
         *
         * **Note:** When this method is called, a snapshot of the slot and page
         * state is created to ensure consistency when sending the ad request and
         * rendering the response. Any changes that are made to the slot or page
         * state after this method is called (including targeting, privacy settings,
         * force SafeFrame, etc.) will only apply to subsequent
         * `display()` or `refresh()` requests.
         *
         * @example
         *   googletag.pubads().display('/1234567/sports', [728, 90], 'div-1');
         *
         * @see [Display a test ad](https://developers.google.com/publisher-tag/samples/display-test-ad)
         * @see [Control ad loading and refresh](https://developers.google.com/publisher-tag/guides/control-ad-loading)
         * @param adUnitPath The [ad unit
         *     path](https://developers.google.com/publisher-tag/guides/get-started#ad-unit-path)
         *     of slot to be rendered.
         * @param size Width and height of the slot.
         * @param div Either the ID of the div containing the slot or the div
         *     element itself.
         * @param clickUrl The click URL to use on this slot.
         */
        display(adUnitPath: string, size: GeneralSize, div?: string | Element, clickUrl?: string): void;

        /**
         * Changes the correlator that is sent with ad requests, effectively
         * starting a new page view. The correlator is the same for all the ad
         * requests coming from one page view, and unique across page views. Only
         * applies to async mode.
         *
         * **Note:** this has no effect on GPT's [long-lived
         * pageview](https://support.google.com/admanager/answer/183281), which
         * automatically reflects the ads actually on the page and has no expiration
         * time.
         *
         * @example
         *   // Assume that the correlator is currently 12345. All ad requests made
         *   // by this page will currently use that value.
         *
         *   // Replace the current correlator with a new correlator.
         *   googletag.pubads().updateCorrelator();
         *
         *   // The correlator will now be a new randomly selected value, different
         *   // from 12345. All subsequent ad requests made by this page will use
         *   // the new value.
         *
         * @return The service object on which the function was called.
         */
        updateCorrelator(): PubAdsService;

        /**
         * Configures whether all ads on the page should be forced to be rendered
         * using a SafeFrame container.
         *
         * Please keep the following things in mind while using this API:
         *
         * - This setting will only take effect for **subsequent** ad requests
         *   made for the respective slots.
         * - The slot level setting, if specified, will always override the page
         *   level setting.
         * - If set to `true` (at slot-level or page level), the ad will always be
         *   rendered using a SafeFrame container independent of the choice made in
         *   the Google Ad Manager UI.
         * - However, if set to `false` or left unspecified, the ad will be rendered
         *   using a SafeFrame container depending on the type of creative and the
         *   selection made in the Google Ad Manager UI.
         * - This API should be used with caution as it could impact the behaviour
         *   of creatives that attempt to break out of their iFrames or rely on
         *   them being rendered directly in a publishers page.
         *
         * @example
         *   googletag.pubads().setForceSafeFrame(true);
         *
         *   // The following slot will be opted-out of the page-level force
         *   // SafeFrame instruction.
         *   googletag.defineSlot('/1234567/sports', [160, 600], 'div-1')!
         *            .setForceSafeFrame(false)
         *            .addService(googletag.pubads());
         *
         *   // The following slot will have SafeFrame forced.
         *   googletag.defineSlot('/1234567/news', [160, 600], 'div-2')!
         *            .addService(googletag.pubads());
         *
         *   googletag.display('div-1');
         *   googletag.display('div-2');
         *
         * @see [Render creatives using SafeFrame](https://support.google.com/admanager/answer/6023110)
         * @param forceSafeFrame `true` to force all ads on the page to
         *     be rendered in SafeFrames and `false` to change the
         *     previous setting to false. Setting this to `false` when
         *     unspecified earlier, won't change anything.
         * @return The service object on which the method was called.
         * @deprecated Use {@link googletag.config.PageSettingsConfig.safeFrame | PageSettingsConfig.safeFrame} instead.
         */
        setForceSafeFrame(forceSafeFrame: boolean): PubAdsService;

        /**
         * Sets the page-level preferences for SafeFrame configuration. Any
         * unrecognized keys in the config object will be ignored. The entire config
         * will be ignored if an invalid value is passed for a recognized key.
         *
         * These page-level preferences will be overridden by slot-level
         * preferences, if specified.
         *
         * @example
         *   googletag.pubads().setForceSafeFrame(true);
         *
         *   const pageConfig = {
         *     allowOverlayExpansion: true,
         *     allowPushExpansion: true,
         *     sandbox: true
         *   };
         *
         *   const slotConfig = {allowOverlayExpansion: false};
         *
         *   googletag.pubads().setSafeFrameConfig(pageConfig);
         *
         *   // The following slot will not allow for expansion by overlay.
         *   googletag.defineSlot('/1234567/sports', [160, 600], 'div-1')!
         *            .setSafeFrameConfig(slotConfig)
         *            .addService(googletag.pubads());
         *
         *   // The following slot will inherit the page level settings, and hence
         *   // would allow for expansion by overlay.
         *   googletag.defineSlot('/1234567/news', [160, 600], 'div-2')!
         *            .addService(googletag.pubads());
         *
         *   googletag.display('div-1');
         *   googletag.display('div-2');
         *
         * @see [Render creatives using SafeFrame](https://support.google.com/admanager/answer/6023110)
         * @param config The configuration object.
         * @return The service object on which the method was called.
         * @deprecated Use {@link googletag.config.PageSettingsConfig.safeFrame | PageSettingsConfig.safeFrame} instead.
         */
        setSafeFrameConfig(config: config.SafeFrameConfig): PubAdsService;

        /**
         * Enables lazy loading in GPT as defined by the config object. For more
         * detailed examples, see the [Lazy
         * loading](https://developers.google.com/publisher-tag/samples/lazy-loading)
         * sample.
         *
         * **Note:** Lazy fetching in SRA only works if all slots are outside the
         * fetching margin.
         *
         * @example
         *   googletag.pubads().enableLazyLoad({
         *     // Fetch slots within 5 viewports.
         *     fetchMarginPercent: 500,
         *     // Render slots within 2 viewports.
         *     renderMarginPercent: 200,
         *     // Double the above values on mobile.
         *     mobileScaling: 2.0
         *   });
         *
         * @see [Ads best practices: Prioritize &quot;important&quot; ad slots](https://developers.google.com/publisher-tag/guides/ad-best-practices#prioritize_important_ad_slots)
         * @see [Lazy loading](https://developers.google.com/publisher-tag/samples/lazy-loading)
         * @param config Configuration object allows customization of lazy behavior.
         *     Any omitted configurations will use a default set by Google
         *     that will be tuned over time. To disable a particular setting, such
         *     as a fetching margin, set the value to `-1`.
         *
         * - `fetchMarginPercent`
         *
         *     The minimum distance from the current viewport a slot must be before
         *     we fetch the ad as a percentage of viewport size. A value of 0 means
         *     "when the slot enters the viewport", 100 means "when the ad is 1
         *     viewport away", and so on.
         *
         * - `renderMarginPercent`
         *
         *     The minimum distance from the current viewport a slot must be before we
         *     render an ad. This allows for prefetching the ad, but waiting to render
         *     and download other subresources. The value works just like
         *     `fetchMarginPercent` as a percentage of viewport.
         *
         * - `mobileScaling`
         *
         *     A multiplier applied to margins on mobile devices. This allows varying
         *     margins on mobile vs. desktop. For example, a value of 2.0 will
         *     multiply all margins by 2 on mobile devices, increasing the minimum
         *     distance a slot can be before fetching and rendering.
         * @deprecated Use {@link googletag.config.PageSettingsConfig.lazyLoad | PageSettingsConfig.lazyLoad} instead.
         */
        enableLazyLoad(config?: {
            fetchMarginPercent?: number;
            renderMarginPercent?: number;
            mobileScaling?: number;
        }): void;

        /**
         * Allows configuration of all privacy settings from a single API using a
         * config object.
         *
         * @example
         *   googletag.pubads().setPrivacySettings({
         *     restrictDataProcessing: true,
         *   });
         *
         *   // Set multiple privacy settings at the same time.
         *   googletag.pubads().setPrivacySettings({
         *     childDirectedTreatment: true,
         *     underAgeOfConsent: true
         *   });
         *
         *   // Clear the configuration for childDirectedTreatment.
         *   googletag.pubads().setPrivacySettings({
         *     childDirectedTreatment: null
         *   });
         *
         * @see [Configure privacy settings](https://developers.google.com/publisher-tag/samples/configure-privacy)
         * @see [Display a limited ad](https://developers.google.com/publisher-tag/samples/display-limited-ad)
         * @param privacySettings Object containing privacy settings config.
         * @return The service object on which the function was called.
         */
        setPrivacySettings(privacySettings: PrivacySettingsConfig): PubAdsService;
    }

    /**
     * An object representing a single ad response.
     *
     * @see {@link Slot.getResponseInformation}
     */
    interface ResponseInformation {
        /** The ID of the advertiser. */
        advertiserId: number | null;

        /** The ID of the campaign. */
        campaignId: number | null;

        /** The ID of the creative. */
        creativeId: number | null;

        /** The ID of the line item. */
        lineItemId: number | null;

        /** The template ID of the ad. */
        creativeTemplateId: number | null;
    }

    /**
     * An object representing the reward associated with a [rewarded
     * ad](https://support.google.com/admanager/answer/9116812)
     *
     * @see [Display a rewarded ad](https://developers.google.com/publisher-tag/samples/display-rewarded-ad)
     */
    interface RewardedPayload {
        /** The type of item included in the reward (for example, "coin"). */
        type: string;

        /** The number of items included in the reward. */
        amount: number;
    }

    /** Base service class that contains methods common for all services. */
    interface Service {
        /**
         * Registers a listener that allows you to set up and call a JavaScript
         * function when a specific GPT event happens on the page. The following
         * events are supported:
         *
         * - {@link events.GameManualInterstitialSlotClosedEvent}
         * - {@link events.GameManualInterstitialSlotReadyEvent}
         * - {@link events.ImpressionViewableEvent}
         * - {@link events.RewardedSlotClosedEvent}
         * - {@link events.RewardedSlotGrantedEvent}
         * - {@link events.RewardedSlotReadyEvent}
         * - {@link events.SlotOnloadEvent}
         * - {@link events.SlotRenderEndedEvent}
         * - {@link events.SlotRequestedEvent}
         * - {@link events.SlotResponseReceived}
         *
         * - {@link events.SlotVisibilityChangedEvent}
         *
         * An object of the appropriate event type is passed to the listener when it
         * is called.
         *
         * @example
         *   // 1. Adding an event listener for the PubAdsService.
         *   googletag.pubads().addEventListener('slotOnload', (event) => {
         *     console.log('Slot has been loaded:');
         *     console.log(event);
         *   });
         *
         *   // 2. Adding an event listener with slot specific logic.
         *   // Listeners operate at service level, which means that you cannot add
         *   // a listener for an event for a specific slot only. You can, however,
         *   // programmatically filter a listener to respond only to a certain ad
         *   // slot, using this pattern:
         *   const targetSlot = googletag.defineSlot('/1234567/example', [160, 600]);
         *   googletag.pubads().addEventListener('slotOnload', (event) => {
         *     if (event.slot === targetSlot) {
         *       // Slot specific logic.
         *     }
         *   });
         *
         * @see [Ad event listeners](https://developers.google.com/publisher-tag/samples/ad-event-listeners)
         * @param eventType A string representing the type of event generated by
         *     GPT. Event types are case sensitive.
         * @param listener Function that takes a single event object argument.
         * @return The service object on which the method was called.
         */
        addEventListener<K extends keyof events.EventTypeMap>(
            eventType: K,
            listener: (arg: events.EventTypeMap[K]) => void,
        ): Service;

        /**
         * Removes a previously registered listener.
         *
         * @example
         * googletag.cmd.push(() => {
         *   // Define a new ad slot.
         *   googletag.defineSlot('/6355419/Travel', [728, 90], 'div-for-slot')!
         *            .addService(googletag.pubads());
         *
         *   // Define a new function that removes itself via removeEventListener
         *   // after the impressionViewable event fires.
         *   const onViewableListener =
         *       (event: googletag.events.ImpressionViewableEvent) => {
         *         googletag.pubads().removeEventListener('impressionViewable',
         *                                                onViewableListener);
         *         setTimeout(() => {
         *           googletag.pubads().refresh([event.slot]);
         *         }, 30000);
         *       };
         *
         *   // Add onViewableListener as a listener for impressionViewable events.
         *   googletag.pubads().addEventListener('impressionViewable',
         *                                       onViewableListener);
         *   googletag.enableServices();
         * });
         * @param eventType A string representing the type of event generated by
         *     GPT. Event types are case sensitive.
         * @param listener Function that takes a single event object argument.
         */
        removeEventListener<K extends keyof events.EventTypeMap>(
            eventType: K,
            listener: (event: events.EventTypeMap[K]) => void,
        ): void;

        /**
         * Get the list of slots associated with this service.
         * @return Slots in the order in which they were added to the service.
         */
        getSlots(): Slot[];
    }

    /**
     * Builder for size mapping specification objects. This builder is provided
     * to help easily construct size specifications.
     *
     * @see [Ad sizes: Responsive ads](https://developers.google.com/publisher-tag/guides/ad-sizes#responsive_ads)
     */
    interface SizeMappingBuilder {
        /**
         * Adds a mapping from a single-size array (representing the viewport) to
         * a single- or multi-size array representing the slot.
         *
         * @example
         *   // Mapping 1
         *   googletag.sizeMapping()
         *            .addSize([1024, 768], [970, 250])
         *            .addSize([980, 690], [728, 90])
         *            .addSize([640, 480], 'fluid')
         *            .addSize([0, 0], [88, 31]) // All viewports &lt; 640x480
         *            .build();
         *
         *   // Mapping 2
         *   googletag.sizeMapping()
         *            .addSize([1024, 768], [970, 250])
         *            .addSize([980, 690], [])
         *            .addSize([640, 480], [120, 60])
         *            .addSize([0, 0], [])
         *            .build();
         *
         *   // Mapping 2 will not show any ads for the following viewport sizes:
         *   // [1024, 768] > size >= [980, 690] and
         *   // [640, 480] > size >= [0, 0]
         *
         * @param viewportSize The size of the viewport for this mapping entry.
         * @param slotSize The sizes of the slot for this mapping entry.
         * @return A reference to this builder.
         */
        addSize(viewportSize: SingleSizeArray, slotSize: GeneralSize): SizeMappingBuilder;

        /**
         * Builds a size map specification from the mappings added to this builder.
         *
         * If any invalid mappings have been supplied, this method will return
         * `null`. Otherwise it returns a specification in the correct
         * format to pass to {@link Slot.defineSizeMapping}.
         *
         * Note: the behavior of the builder after calling this method is undefined.
         *
         * @return The result built by this builder. Can be null if invalid size
         *     mappings were supplied.
         */
        build(): SizeMappingArray | null;
    }

    /** Slot is an object representing a single ad slot on a page. */
    interface Slot {
        /**
         * Sets a value for an AdSense attribute on this ad slot. This will override
         * any values set at the service level for this key.
         *
         * Calling this method more than once for the same key will override
         * previously set values for that key. All values must be set before calling
         * `display` or `refresh`.
         *
         * @example
         *   // Setting an attribute on a single ad slot.
         *   googletag.defineSlot('/1234567/sports', [160, 600], 'div')!
         *            .set('adsense_background_color', '#FFFFFF')
         *            .addService(googletag.pubads());
         *
         * @see [AdSense Attributes](https://developers.google.com/publisher-tag/adsense_attributes)
         * @param key The name of the attribute.
         * @param value Attribute value.
         * @return The slot object on which the method was called.
         * @deprecated Use {@link googletag.config.SlotSettingsConfig.adsenseAttributes | SlotSettingsConfig.adsenseAttributes} instead.
         */
        set(key: string, value: string): Slot;

        /**
         * Returns the value for the AdSense attribute associated with the given
         * key for this slot. To see service-level attributes inherited by
         * this slot, use {@link PubAdsService.get}.
         *
         * @example
         *   const slot = googletag.defineSlot('/1234567/sports', [160, 600], 'div')!
         *                         .set('adsense_background_color', '#FFFFFF')
         *                         .addService(googletag.pubads());
         *
         *   slot.get('adsense_background_color');
         *   // Returns '#FFFFFF'.
         *
         * @see [AdSense Attributes](https://developers.google.com/publisher-tag/adsense_attributes)
         * @param key Name of the attribute to look for.
         * @return Current value for the attribute key, or `null` if the
         *     key is not present.
         * @deprecated Use {@link googletag.Slot.getConfig} instead.
         */
        get(key: string): string | null;

        /**
         * Returns the list of attribute keys set on this slot. To see the keys of
         * service-level attributes inherited by this slot, use
         * {@link PubAdsService.getAttributeKeys}.
         *
         * @example
         *   const slot = googletag.defineSlot('/1234567/sports', [160, 600], 'div')!
         *                         .set('adsense_background_color', '#FFFFFF')
         *                         .set('adsense_border_color', '#AABBCC')
         *                         .addService(googletag.pubads());
         *
         *   slot.getAttributeKeys();
         *   // Returns ['adsense_background_color', 'adsense_border_color'].
         *
         * @return Array of attribute keys. Ordering is undefined.
         * @deprecated Use {@link googletag.Slot.getConfig} instead.
         */
        getAttributeKeys(): string[];

        /**
         * Adds a {@link Service} to this slot.
         *
         * @example
         *   googletag.defineSlot('/1234567/sports', [160, 600], 'div')!
         *            .addService(googletag.pubads());
         *
         * @see [Get Started with Google Publisher Tags](https://developers.google.com/publisher-tag/guides/get-started)
         * @see [Display a test ad](https://developers.google.com/publisher-tag/samples/display-test-ad)
         * @param service The service to be added.
         * @return The slot object on which the method was called.
         */
        addService(service: Service): Slot;

        /**
         * Sets an array of mappings from a minimum viewport size to slot size
         * for this slot.
         *
         * @example
         *   const slot = googletag.defineSlot('/1234567/sports', [160, 600], 'div')!
         *                         .addService(googletag.pubads());
         *
         *   const mapping = googletag.sizeMapping()
         *                            .addSize([100, 100], [88, 31])
         *                            .addSize([320, 400], [[320, 50], [300, 50]])
         *                            .build();
         *
         *   slot.defineSizeMapping(mapping!);
         *
         * @see [Ad sizes: Responsive ads](https://developers.google.com/publisher-tag/guides/ad-sizes#responsive_ads)
         * @param sizeMapping Array of size mappings. You can use
         *     {@link SizeMappingBuilder} to create it. Each size mapping is an array
         *     of two elements: {@link SingleSizeArray} and {@link GeneralSize}.
         * @return The slot object on which the method was called.
         */
        defineSizeMapping(sizeMapping: SizeMappingArray): Slot;

        /**
         * Sets the click URL to which users will be redirected after clicking on
         * the ad.
         *
         * The Google Ad Manager servers still record a click even if the
         * click URL is replaced. Any landing page URL associated with the creative
         * that is served is appended to the provided value. Subsequent calls
         * overwrite the value. This works only for non-SRA requests.
         *
         * @example
         *   googletag.defineSlot('/1234567/sports', [160, 600], 'div')!
         *            .setClickUrl('http://www.example.com?original_click_url=')
         *            .addService(googletag.pubads());
         *
         * @param value The click URL to set.
         * @return The slot object on which the method was called.
         * @deprecated Use {@link googletag.config.SlotSettingsConfig.clickUrl | SlotSettingsConfig.clickUrl} instead.
         */
        setClickUrl(value: string): Slot;

        /**
         * Sets a slot-level ad category exclusion label on this slot.
         *
         * @example
         *   // Label = AirlineAd
         *   googletag.defineSlot('/1234567/sports', [160, 600], 'div')!
         *            .setCategoryExclusion('AirlineAd')
         *            .addService(googletag.pubads());
         *
         * @see [Custom labels to block ads](https://support.google.com/admanager/answer/3238504)
         * @param categoryExclusion The ad category exclusion label to add.
         * @return The slot object on which the method was called.
         * @deprecated Use {@link googletag.config.SlotSettingsConfig.categoryExclusion | SlotSettingsConfig.categoryExclusion} instead.
         */
        setCategoryExclusion(categoryExclusion: string): Slot;

        /**
         * Clears all slot-level ad category exclusion labels for this slot.
         *
         * @example
         *   // Set category exclusion to exclude ads with 'AirlineAd' labels.
         *   const slot = googletag.defineSlot('/1234567/sports', [160, 600], 'div')!
         *                         .setCategoryExclusion('AirlineAd')
         *                         .addService(googletag.pubads());
         *
         *   // Make an ad request. No ad with 'AirlineAd' label will be returned
         *   // for the slot.
         *
         *   // Clear category exclusions so all ads can be returned.
         *   slot.clearCategoryExclusions();
         *
         *   // Make an ad request. Any ad can be returned for the slot.
         *
         * @return The slot object on which the method was called.
         * @deprecated Use {@link googletag.config.SlotSettingsConfig.categoryExclusion | SlotSettingsConfig.categoryExclusion} instead.
         */
        clearCategoryExclusions(): Slot;

        /**
         * Returns the ad category exclusion labels for this slot.
         *
         * @example
         *   const slot = googletag.defineSlot('/1234567/sports', [160, 600], 'div')!
         *                         .setCategoryExclusion('AirlineAd')
         *                         .setCategoryExclusion('TrainAd')
         *                         .addService(googletag.pubads());
         *
         *   slot.getCategoryExclusions();
         *   // Returns ['AirlineAd', 'TrainAd'].
         *
         * @return The ad category exclusion labels for this slot, or an empty array
         *     if none have been set.
         * @deprecated Use {@link googletag.Slot.getConfig} instead.
         */
        getCategoryExclusions(): string[];

        /**
         * Sets a custom targeting parameter for this slot. Calling this method
         * multiple times for the same key will overwrite old values. Values set
         * here will overwrite targeting parameters set at the service-level. These
         * keys are defined in your Google Ad Manager account.
         *
         * @example
         *   const slot = googletag.defineSlot('/1234567/sports', [160, 600], 'div')!
         *                         .addService(googletag.pubads());
         *
         *   // Example with a single value for a key.
         *   slot.setTargeting('allow_expandable', 'true');
         *
         *   // Example with multiple values for a key inside in an array.
         *   slot.setTargeting('interests', ['sports', 'music']);
         *
         * @see [Key-value targeting](https://developers.google.com/publisher-tag/guides/key-value-targeting)
         * @param key Targeting parameter key.
         * @param value Targeting parameter value or array of values.
         * @return The slot object on which the method was called.
         * @deprecated Use {@link googletag.config.SlotSettingsConfig.targeting | SlotSettingsConfig.targeting} instead.
         */
        setTargeting(key: string, value: string | string[]): Slot;

        /**
         * Clears specific or all custom slot-level targeting parameters for this
         * slot.
         *
         * @example
         *   const slot = googletag.defineSlot('/1234567/sports', [160, 600], 'div')!
         *                         .setTargeting('allow_expandable', 'true')
         *                         .setTargeting('interests', ['sports', 'music'])
         *                         .setTargeting('color', 'red')
         *                         .addService(googletag.pubads());
         *
         *   slot.clearTargeting('color');
         *   // Targeting 'allow_expandable' and 'interests' are still present,
         *   // while 'color' was cleared.
         *
         *   slot.clearTargeting();
         *   // All targeting has been cleared.
         *
         * @see [Key-value targeting](https://developers.google.com/publisher-tag/guides/key-value-targeting)
         * @param key Targeting parameter key. The key is optional; all
         *     targeting parameters will be cleared if it is unspecified.
         * @return The slot object on which the method was called.
         * @deprecated Use {@link googletag.config.SlotSettingsConfig.targeting | SlotSettingsConfig.targeting} instead.
         */
        clearTargeting(key?: string): Slot;

        /**
         * Returns a specific custom targeting parameter set on this slot.
         * Service-level targeting parameters are not included.
         *
         * @example
         *   const slot = googletag.defineSlot('/1234567/sports', [160, 600], 'div')!
         *                         .setTargeting('allow_expandable', 'true')
         *                         .addService(googletag.pubads());
         *
         *   slot.getTargeting('allow_expandable');
         *   // Returns ['true'].
         *
         *   slot.getTargeting('age');
         *   // Returns [] (empty array).
         *
         * @param key The targeting key to look for.
         * @return The values associated with this key, or an empty array if there
         *     is no such key.
         * @deprecated Use {@link googletag.Slot.getConfig} instead.
         */
        getTargeting(key: string): string[];

        /**
         * Returns the list of all custom targeting keys set on this slot.
         * Service-level targeting keys are not included.
         *
         * @example
         *   const slot = googletag.defineSlot('/1234567/sports', [160, 600], 'div')!
         *                         .setTargeting('allow_expandable', 'true')
         *                         .setTargeting('interests', ['sports', 'music'])
         *                         .addService(googletag.pubads());
         *
         *   slot.getTargetingKeys();
         *   // Returns ['interests', 'allow_expandable'].
         *
         * @return Array of targeting keys. Ordering is undefined.
         * @deprecated Use {@link googletag.Slot.getConfig} instead.
         */
        getTargetingKeys(): string[];

        /**
         * Sets whether the slot `div` should be hidden when there is no
         * ad in the slot. This overrides the service-level settings.
         *
         * @example
         *   googletag.defineSlot('/1234567/sports', [160, 600], 'div-1')!
         *            .setCollapseEmptyDiv(true, true)
         *            .addService(googletag.pubads());
         *   // The above will cause the div for this slot to be collapsed
         *   // when the page is loaded, before ads are requested.
         *
         *   googletag.defineSlot('/1234567/sports', [160, 600], 'div-2')!
         *            .setCollapseEmptyDiv(true)
         *            .addService(googletag.pubads());
         *   // The above will cause the div for this slot to be collapsed
         *   // only after GPT detects that no ads are available for the slot.
         *
         * @see [Collapse empty ad slots](https://developers.google.com/publisher-tag/samples/collapse-empty-ad-slots)
         * @see [Minimize layout shift](https://developers.google.com/publisher-tag/guides/minimize-layout-shift)
         * @param collapse Whether to collapse the slot if no ad is returned.
         * @param collapseBeforeAdFetch Whether to collapse the slot even before an
         *     ad is fetched. Ignored if collapse is not `true`.
         * @return The slot object on which the method was called.
         * @deprecated Use {@link googletag.config.SlotSettingsConfig.collapseDiv | SlotSettingsConfig.collapseDiv} instead.
         */
        setCollapseEmptyDiv(collapse: boolean, collapseBeforeAdFetch?: boolean): Slot;

        /**
         * Returns the full path of the ad unit, with the network code and ad unit
         * path.
         *
         * @example
         *   const slot = googletag.defineSlot('/1234567/sports', [160, 600], 'div')!
         *                         .addService(googletag.pubads());
         *
         *   slot.getAdUnitPath();
         *   // Returns '/1234567/sports'.
         *
         * @return Ad unit path.
         */
        getAdUnitPath(): string;

        /**
         * Returns the ID of the slot `div` provided when the slot was
         * defined.
         *
         * @example
         *   const slot = googletag.defineSlot('/1234567/sports', [160, 600], 'div')!
         *                         .addService(googletag.pubads());
         *
         *   slot.getSlotElementId();
         *   // Returns 'div'.
         *
         * @return Slot `div` ID.
         */
        getSlotElementId(): string;

        /**
         * Configures whether ads in this slot should be forced to be rendered using
         * a SafeFrame container.
         *
         * Please keep the following things in mind while using this API:
         *
         * - This setting will only take effect for **subsequent** ad requests
         *   made for the respective slots.
         * - The slot level setting, if specified, will always override the page
         *   level setting.
         * - If set to `true` (at slot-level or page level), the ad will always be
         *   rendered using a SafeFrame container independent of the choice made in
         *   the Google Ad Manager UI.
         * - However, if set to `false` or left unspecified, the ad will be rendered
         *   using a SafeFrame container depending on the type of creative and the
         *   selection made in the Google Ad Manager UI.
         * - This API should be used with caution as it could impact the behaviour
         *   of creatives that attempt to break out of their iFrames or rely on
         *   them being rendered directly in a publishers page.
         *
         * @example
         *   googletag.defineSlot('/1234567/sports', [160, 600], 'div')!
         *            .setForceSafeFrame(true)
         *            .addService(googletag.pubads());
         *
         * @see [Render creatives using SafeFrame](https://support.google.com/admanager/answer/6023110)
         * @param forceSafeFrame `true` to force all ads in this slot to
         *     be rendered in SafeFrames and `false` to opt-out of a
         *     page-level setting (if present). Setting this to `false`
         *     when not specified at the page-level won't change anything.
         * @return The slot object on which the method was called.
         * @deprecated Use {@link googletag.config.SlotSettingsConfig.safeFrame | SlotSettingsConfig.safeFrame} instead.
         */
        setForceSafeFrame(forceSafeFrame: boolean): Slot;

        /**
         * Sets the slot-level preferences for SafeFrame configuration. Any
         * unrecognized keys in the config object will be ignored. The entire config
         * will be ignored if an invalid value is passed for a recognized key.
         *
         * These slot-level preferences, if specified, will override any page-level
         * preferences.
         *
         * @example
         *   googletag.pubads().setForceSafeFrame(true);
         *
         *   // The following slot will have a sandboxed safeframe that only
         *   // disallows top-level navigation.
         *   googletag.defineSlot('/1234567/sports', [160, 600], 'div-1')!
         *            .setSafeFrameConfig({sandbox: true})
         *            .addService(googletag.pubads());
         *
         *   // The following slot will inherit page-level settings.
         *   googletag.defineSlot('/1234567/news', [160, 600], 'div-2')!
         *            .addService(googletag.pubads());
         *
         *   googletag.display('div-1');
         *   googletag.display('div-2');
         *
         * @see [Render creatives using SafeFrame](https://support.google.com/admanager/answer/6023110)
         * @param config The configuration object.
         * @return The slot object on which the method was called.
         * @deprecated Use {@link googletag.config.SlotSettingsConfig.safeFrame | SlotSettingsConfig.safeFrame} instead.
         */
        setSafeFrameConfig(config: config.SafeFrameConfig | null): Slot;

        /**
         * Returns the ad response information. This is based on the last ad
         * response for the slot. If this is called when the slot has no ad,
         * `null` will be returned.
         *
         * @return The latest ad response information, or `null` if the
         *     slot has no ad.
         */
        getResponseInformation(): ResponseInformation | null;

        /**
         * Sets custom targeting parameters for this slot, from a key:value map
         * in a JSON object. This is the same as calling {@link Slot.setTargeting}
         * for all the key values of the object. These keys are defined in your
         * Google Ad Manager account.
         *
         * **Notes:**
         *
         * - In case of overwriting, only the last value will be kept.
         * - If the value is an array, any previous value will be overwritten, not
         *   merged.
         * - Values set here will overwrite targeting parameters set at the
         *   service-level.
         *
         * @example
         *   const slot = googletag.defineSlot('/1234567/sports', [160, 600], 'div')!;
         *
         *   slot.updateTargetingFromMap({
         *     'color': 'red',
         *     'interests': ['sports','music','movies']
         *   });
         *
         * @param map Targeting parameter key:value map.
         * @return The slot object on which the method was called.
         * @deprecated Use {@link googletag.config.SlotSettingsConfig.targeting | SlotSettingsConfig.targeting} instead.
         */
        updateTargetingFromMap(map: { [adUnitPath: string]: string | string[] }): Slot;

        /**
         * Sets general configuration options for this slot.
         *
         * @param slotConfig The configuration object.
         */
        setConfig(slotConfig: config.SlotSettingsConfig): void;

        /**
         * Gets general configuration options for the slot set by {@link setConfig}.
         *
         * Not all `setConfig()` properties are supported by this method. Supported
         * properties are:
         * - {@link googletag.config.SlotSettingsConfig.adsenseAttributes | `adsenseAttributes`}
         * - {@link googletag.config.SlotSettingsConfig.categoryExclusion | `categoryExclusion`}
         * - {@link googletag.config.SlotSettingsConfig.targeting | `targeting`}
         *
         * @example
         *   const slot = googletag.defineSlot('/1234567/sports', [160, 600], 'div')!;
         *
         *   // Get the value of the `targeting` setting.
         *   const targetingConfig = slot.getConfig('targeting');
         *
         *   // Get the value of the `adsenseAttributes` and `categoryExclusion` settings.
         *   const config = slot.getConfig(['adsenseAttributes', 'categoryExclusion']);
         *
         * @param keys The keys of the configuration options to get.
         * @return The configuration options for the slot.
         */
        getConfig(
            keys: string | string[],
        ): Pick<config.SlotSettingsConfig, "categoryExclusion" | "targeting" | "adsenseAttributes">;
    }

    /** Array of two numbers representing [width, height]. */
    type SingleSizeArray = [number, number];

    /**
     * Named sizes that a slot can have. In most cases size is a fixed-size
     * rectangle but there are some cases when we need other kinds of size
     * specifications. Only the following are valid named sizes:
     *
     * - **fluid**: the ad container takes 100% width of parent div and then
     *   resizes its height to fit creative content. Similar to how regular block
     *   elements on a page behave. Used for native ads (see
     *   [related article](https://support.google.com/admanager/answer/6366845)).
     *   Note that both `fluid` and `['fluid']` are acceptable forms to declare a
     *   slot size as fluid.
     */
    type NamedSize = "fluid" | ["fluid"];

    /**
     * A single valid size for a slot.
     */
    type SingleSize = SingleSizeArray | NamedSize;

    /**
     * A list of single valid sizes.
     */
    type MultiSize = SingleSize[];

    /**
     * A valid size configuration for a slot, which can be one or multiple sizes.
     */
    type GeneralSize = SingleSize | MultiSize;

    /**
     * A mapping of viewport size to ad sizes. Used for responsive ads.
     */
    type SizeMapping = [SingleSizeArray, GeneralSize];

    /**
     * A list of size mappings.
     */
    type SizeMappingArray = SizeMapping[];

    /**
     * Main configuration interface for page-level settings.
     */
    namespace config {
        /**
         * Settings to control ad expansion.
         *
         * @example
         *   // Enable ad slot expansion across the entire page.
         *   googletag.setConfig({
         *     adExpansion: {enabled: true}
         *   });
         */
        interface AdExpansionConfig {
            /**
             * Whether ad expansion is enabled or disabled.
             *
             * Setting this value overrides the default configured in
             * Google Ad Manager.
             *
             * @see [Expand ads on desktop and tablet](https://support.google.com/admanager/answer/9384852)
             * @see [Expand ads on mobile web (partial screen)](https://support.google.com/admanager/answer/9117822)
             */
            enabled?: boolean | null;
        }

        /**
         * @namespace config
         */

        /**
         * Settings to control the behavior of AdSense ads.
         *
         * These attributes can be used to override server-side
         * settings on a per-request basis.
         *
         * @see {@link googletag.config.PageSettingsConfig.adsenseAttributes | PageSettingsConfig.adsenseAttributes}
         * @see {@link googletag.config.SlotSettingsConfig.adsenseAttributes | SlotSettingsConfig.adsenseAttributes}
         */
        /* tslint:disable:enforce-name-casing */
        interface AdSenseAttributesConfig {
            /**
             * AdSense channel IDs.
             *
             * Allowed values are channel IDs separated by '+'.
             *
             * Example: `271828183+314159265`
             *
             * @see [Track ad unit performance with custom channels](https://support.google.com/adsense/answer/10078316)
             */
            adsense_channel_ids?: string | null;

            /**
             * AdSense ad format.
             */
            adsense_ad_format?:
                | "120x240_as"
                | "120x600_as"
                | "125x125_as"
                | "160x600_as"
                | "180x150_as"
                | "200x200_as"
                | "234x60_as"
                | "250x250_as"
                | "300x250_as"
                | "336x280_as"
                | "468x60_as"
                | "728x90_as"
                | null;

            /**
             * URL of the page on which ads are displayed.
             *
             * Allowed values are valid URLs.
             *
             * Example: `http://www.example.com`
             */
            page_url?: string | null;

            /**
             * Language of the page on which ads are displayed.
             *
             * Allowed values are valid ISO 639-1 language codes.
             *
             * Example: `en`
             *
             * @see [List of ISO 639 language codes](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes)
             */
            document_language?: string | null;

            /**
             * Whether or not test mode is enabled.
             *
             * When set to `on`, ads are marked as test-only, and won't be
             * included in counting or billing. This setting must be unset
             * for production, non-test traffic.
             */
            adsense_test_mode?: "on" | null;
        }

        /**
         * Settings to control the use of lazy loading in GPT.
         *
         * @see {@link googletag.config.PageSettingsConfig.lazyLoad | PageSettingsConfig.lazyLoad}
         */
        interface LazyLoadConfig {
            /**
             * The minimum distance from the current viewport a slot must be before
             * we request an ad, expressed as a percentage of viewport size.
             *
             * Used in conjunction with {@link renderMarginPercent}, this setting allows
             * for prefetching an ad, but waiting to render and download other
             * subresources. As such, this value should always be greater than or equal
             * to {@link renderMarginPercent}.
             *
             * A value of `0` means "when the slot enters the viewport", `100` means "when
             * the ad is 1 viewport away", and so on.
             */
            fetchMarginPercent?: number | null;

            /**
             * The minimum distance from the current viewport a slot must be before we
             * render an ad, expressed as a percentage of viewport size.
             *
             * Used in conjunction with {@link fetchMarginPercent}, this setting allows
             * for prefetching an ad, but waiting to render and download other
             * subresources. As such, this value should always be less than or equal to
             * {@link fetchMarginPercent}.
             *
             * A value of `0` means "when the slot enters the viewport", `100` means "when
             * the ad is 1 viewport away", and so on.
             */
            renderMarginPercent?: number | null;

            /**
             * A multiplier applied to margins on mobile devices. This multiplier is
             * applied to both {@link fetchMarginPercent} and {@link renderMarginPercent}.
             *
             * This allows for different margins on mobile vs. desktop, where viewport
             * sizes and scroll speeds may be different. For example, a value of 2.0 will
             * multiply all margins by 2 on mobile devices, increasing the minimum
             * distance a slot can be from the viewport before fetching and rendering.
             */
            mobileScaling?: number | null;
        }

        /**
         * Main configuration interface for page-level settings.
         *
         * Allows setting multiple features with a single API call.
         *
         * All properties listed below are examples and do not reflect actual features
         * that utilize setConfig.  For the set of features, see fields within the
         * PageSettingsConfig type below.
         *
         * Examples:
         * - Only features specified in the {@link googletag.setConfig} call are
         *   modified.
         *   ```
         *   // Configure feature alpha.
         *   googletag.setConfig({
         *       alpha: {...}
         *   });
         *
         *   // Configure feature bravo. Feature alpha is unchanged.
         *   googletag.setConfig({
         *      bravo: {...}
         *   });
         *   ```
         * - All settings for a given feature are updated with each call to
         *   {@link googletag.setConfig}.
         *   ```
         *   // Configure feature charlie to echo = 1, foxtrot = true.
         *   googletag.setConfig({
         *       charlie: {
         *           echo: 1,
         *           foxtrot: true,
         *       }
         *   });
         *
         *   // Update feature charlie to echo = 2. Since foxtrot was not specified,
         *   // the value is cleared.
         *   googletag.setConfig({
         *       charlie: {
         *           echo: 2
         *       }
         *   });
         *   ```
         * - All settings for a feature can be cleared by passing `null`.
         *   ```
         *   // Configure features delta, golf, and hotel.
         *   googletag.setConfig({
         *       delta: {...},
         *       golf: {...},
         *       hotel: {...},
         *   });
         *
         *   // Feature delta and hotel are cleared, but feature golf remains set.
         *   googletag.setConfig({
         *       delta: null,
         *       hotel: null,
         *   });
         *   ```
         */
        interface PageSettingsConfig {
            /**
             * Settings to control publisher privacy treatments.
             */
            privacyTreatments?: PrivacyTreatmentsConfig | null;

            /**
             * Settings to control ad expansion.
             */
            adExpansion?: AdExpansionConfig | null;

            /**
             * Settings to control publisher provided signals (PPS).
             */
            pps?: PublisherProvidedSignalsConfig | null;

            /**
             * Setting to control whether GPT should yield the JS thread when requesting
             * and rendering creatives.
             *
             * GPT will yield only for browsers that support the Scheduler.postTask
             * or Scheduler.yield API.
             *
             * Supported values:
             *  - `null` (default): GPT will yield the JS thread for slots outside of
             *    the viewport.
             *  - `ENABLED_ALL_SLOTS`: GPT will yield the JS thread for all slots
             *    regardless of whether the slot is within the viewport.
             *  - `DISABLED`: GPT will not yield the JS thread.
             *
             * @example
             *   // Disable yielding.
             *   googletag.setConfig({threadYield: 'DISABLED'});
             *
             *   // Enable yielding for all slots.
             *   googletag.setConfig({threadYield: 'ENABLED_ALL_SLOTS'});
             *
             *   // Enable yielding only for slots outside of the viewport (default).
             *   googletag.setConfig({threadYield: null});
             *
             * @see [Scheduler](https://developer.mozilla.org/docs/Web/API/Scheduler)
             */
            threadYield?: "DISABLED" | "ENABLED_ALL_SLOTS" | null;

            /**
             * @deprecated Use
             * {@link googletag.config.PageSettingsConfig.threadYield | threadYield}
             * instead. This will be removed in the near future.
             */
            adYield?: "DISABLED" | "ENABLED_ALL_SLOTS" | null;

            /**
             * Setting to geo-target line items to geographic locations.
             *
             * @example
             *   // Geo-target line items to US postal code 10001.
             *   googletag.setConfig({location: "10001,US"});
             *
             *   // Clear the location setting.
             *   googletag.setConfig({location: null});
             *
             * @see [Target geographic locations for delivery](https://support.google.com/admanager/answer/1260290)
             */
            location?: string | null;

            /**
             * Settings to control video ads.
             *
             * @example
             *   // Enable video ads and set video content and content source IDs.
             *   googletag.setConfig({
             *     videoAds: {
             *       enableVideoAds: true,
             *       videoContentId: 'e1eGlRL7ju8',
             *       videoCmsId: '1234567'
             *     }
             *   });
             *
             * @see [Video content ingestion](https://support.google.com/admanager/topic/9210762)
             */
            videoAds?: VideoAdsConfig | null;

            /**
             * Settings to control the use of lazy loading in GPT.
             *
             * Lazy loading is a technique to delay the requesting and rendering of ads
             * until they approach the user's viewport. For a more detailed example, see the
             * [Lazy loading](https://developers.google.com/publisher-tag/samples/lazy-loading)
             * sample.
             *
             * **Note:** If
             * {@link config.PageSettingsConfig.singleRequest | `singleRequest`} is enabled,
             * lazy fetching only works when all slots are outside the fetch margin.
             *
             * Any lazy load settings which are not specified when calling
             * `setConfig()` will use a default value set by Google. These defaults may be
             * tuned over time. To disable a particular setting, set the value to `null`.
             *
             * @example
             *   // Enable lazy loading.
             *   googletag.setConfig({
             *     lazyLoad: {
             *       // Fetch slots within 5 viewports.
             *       fetchMarginPercent: 500,
             *       // Render slots within 2 viewports.
             *       renderMarginPercent: 200,
             *       // Double the above values on mobile.
             *       mobileScaling: 2.0}
             *   });
             *
             *   // Clear fetch margin only.
             *   googletag.setConfig({
             *     lazyLoad: {fetchMarginPercent: null}
             *   });
             *
             *   // Clear all lazy loading settings.
             *   googletag.setConfig({lazyLoad: null});
             *
             * @see [Ads best practices: Prioritize &quot;important&quot; ad slots](https://developers.google.com/publisher-tag/guides/ad-best-practices#prioritize_important_ad_slots)
             * @see [Lazy loading](https://developers.google.com/publisher-tag/samples/lazy-loading)
             */
            lazyLoad?: LazyLoadConfig | null;

            /**
             * Settings to control the use of
             * [SafeFrame](https://support.google.com/admanager/answer/6023110)
             * in GPT.
             *
             * Values configured via this setting will apply to all ad slots on the page.
             * Individual ad slots may override these values via
             * {@link googletag.config.SlotSettingsConfig.safeFrame | SlotSettingsConfig.safeFrame}.
             *
             * @example
             *   // Force SafeFrame for all ads on the page.
             *   googletag.setConfig({
             *     safeFrame: {forceSafeFrame: true}
             *   });
             *
             *   // Configure SafeFrame to allow overlay expansion.
             *   googletag.setConfig({
             *     safeFrame: {allowOverlayExpansion: true}
             *   });
             *
             *   // Clear forceSafeFrame setting.
             *   googletag.setConfig({
             *     safeFrame: {forceSafeFrame: null}
             *   });
             *
             *   // Clear all SafeFrame settings.
             *   googletag.setConfig({safeFrame: null});
             */
            safeFrame?: SafeFrameConfig | null;

            /**
             * Setting to control the horizontal centering of ads. Centering is disabled
             * by default.
             *
             * Horizontal centering changes only apply to ads requested after this method
             * has been called. For that reason, it is recommended to call this method before
             * any calls to {@link googletag.display} or {@link PubAdsService.refresh}.
             *
             * @example
             *   // Make ads centered.
             *   googletag.setConfig({centering: true});
             *
             *   // Clear the centering setting.
             *   googletag.setConfig({centering: null});
             */
            centering?: boolean | null;

            /**
             * Setting to control the collapsing behavior of ad slots.
             *
             * A collapsed ad slot does not take up any space on the page.
             *
             * Supported values:
             *  - `null` (default): The slot will not be collapsed.
             *  - `DISABLED`: The slot will not collapse, whether or not an ad is
             *    returned.
             *  - `BEFORE_FETCH`: The slot will start out collapsed, and expand when
             *    an ad is returned.
             *  - `ON_NO_FILL`: The slot will start out expanded, and collapse if no ad
             *    is returned.
             *
             * @example
             *   // Collapse the div for this slot if no ad is returned.
             *   googletag.setConfig({collapseDiv: 'ON_NO_FILL'});
             *
             *   // Collapse the div for this slot by default, and expand only
             *   // if an ad is returned.
             *   googletag.setConfig({collapseDiv: 'BEFORE_FETCH'});
             *
             *   // Do not collapse the div for this slot.
             *   googletag.setConfig({collapseDiv: 'DISABLED'});
             *
             *   // Clear the collapse setting.
             *   googletag.setConfig({collapseDiv: null});
             *
             * @see [Collapse empty ad slots](https://developers.google.com/publisher-tag/samples/collapse-empty-ad-slots)
             * @see [Minimize layout shift](https://developers.google.com/publisher-tag/guides/minimize-layout-shift)
             */
            collapseDiv?: "DISABLED" | "BEFORE_FETCH" | "ON_NO_FILL" | null;

            /**
             * Setting to enable or disable Single Request Architecture (SRA).
             *
             * When SRA is enabled, all ad slots defined prior to a
             * {@link googletag.display} or {@link PubAdsService.refresh} call will be
             * batched into a single ad request. This provides performance benefits, but
             * is also necessary to ensure roadblocks and competetive exclusions are
             * honored.
             *
             * When SRA is disabled, each ad slot is requested individually. This is the
             * default behavior of GPT.
             *
             * This method *must* be called prior to calling {@link googletag.enableServices}.
             *
             * @example
             *   // Enable Single Request Architecture.
             *   googletag.setConfig({singleRequest: true});
             *
             * @see [About roadblocks](https://support.google.com/admanager/answer/177277)
             * @see [Ads best practices: Use Single Request Architecture correctly](https://developers.google.com/publisher-tag/guides/ad-best-practices#use_single_request_architecture_correctly)
             * @see [Control SRA batching](https://developers.google.com/publisher-tag/samples/control-sra-batching)
             */
            singleRequest?: boolean | null;

            /**
             * Setting to control when ads are requested.
             *
             * By default, the {@link googletag.display} method both registers ad slots and
             * requests ads for them. However, there are times when it may be preferable to
             * separate these actions, in order to more precisely control when ad content is
             * loaded.
             *
             * By enabling this setting, ads will not be requested for registered slots when the
             * `display()` method is called. Instead, a separate call to
             * {@link PubAdsService.refresh} must be made to initiate an ad request.
             *
             * This method *must* be called before calling {@link googletag.enableServices}.
             *
             * @example
             * // Prevent requesting ads when `display()` is called.
             * googletag.setConfig({disableInitialLoad: true});
             *
             * @see [Control ad loading and refresh](https://developers.google.com/publisher-tag/guides/control-ad-loading)
             * @see [Control SRA batching](https://developers.google.com/publisher-tag/samples/control-sra-batching)
             */
            disableInitialLoad?: boolean | null;

            /**
             * Setting to configure ad category exclusions.
             *
             * @example
             *   // Label = AirlineAd.
             *   googletag.setConfig({categoryExclusion: ['AirlineAd']});
             *
             *   // Clearing category exclusion setting.
             *   googletag.setConfig({categoryExclusion: null});
             *
             * @see [Custom labels to block ads](https://support.google.com/admanager/answer/3238504)
             */
            categoryExclusion?: string[] | null;

            /**
             * Setting to control key-value targeting.
             *
             * Targeting configured via this setting will apply to all ad slots on the page.
             * This setting may be called multiple times to define multiple targeting
             * key-values, or overwrite existing values.
             * Targeting keys are defined in your Google Ad Manager account.
             *
             * @example
             *   // Setting a single targeting key-value.
             *   googletag.setConfig({targeting: {interests: 'sports'}});
             *
             *   // Setting multiple values for a single targeting key
             *   googletag.setConfig({targeting: {interests: ['sports', 'music']}});
             *
             *   // Setting multiple targeting key-values at once.
             *   googletag.setConfig({targeting: {interests: ['sports', 'music'], color: 'red'}});
             *
             *   // Clearing a single targeting key.
             *   googletag.setConfig({targeting: {interests: null}});
             *
             * @see [Key-value targeting](https://developers.google.com/publisher-tag/guides/key-value-targeting)
             */
            targeting?: Record<string, string | string[] | null> | null;

            /**
             * Setting to configure AdSense attributes.
             *
             * AdSense attributes configured via this setting will apply to all ad slots on
             * the page. This setting may be called multiple times to define multiple
             * attribute values, or overwrite existing values.
             *
             * AdSense attribute changes only apply to ads requested after this method
             * has been called. For that reason, it is recommended to call this method before
             * any calls to {@link googletag.display} or {@link PubAdsService.refresh}.
             *
             * @example
             *   // Set the document language and page URL.
             *   googletag.setConfig({adsenseAttributes: {document_language: 'en', page_url: 'http://www.example.com'}});
             *
             *   // Clear the page URL only.
             *   googletag.setConfig({adsenseAttributes: {page_url: null}});
             *
             *   // Clear all AdSense attributes.
             *   googletag.setConfig({adsenseAttributes: null});
             */
            adsenseAttributes?: AdSenseAttributesConfig | null;
        }

        /**
         * Settings to control publisher privacy treatments.
         */
        interface PrivacyTreatmentsConfig {
            /**
             * An array of publisher privacy treatments to enable.
             *
             * @example
             *   // Disable personalization across the entire page.
             *   googletag.setConfig({
             *     privacyTreatments: {treatments: ['disablePersonalization']}
             *   });
             */
            treatments: PrivacyTreatment[] | null;
        }

        /**
         * Supported publisher privacy treatments.
         */
        type PrivacyTreatment = "disablePersonalization";

        /**
         * Publisher provided signals (PPS) configuration object.
         *
         * @example
         * googletag.setConfig({
         *   pps: {
         *     taxonomies: {
         *       'IAB_AUDIENCE_1_1':
         *           {values: ['6', '626']},
         *           // '6' = 'Demographic | Age Range | 30-34'
         *           // '626' = 'Interest | Sports | Darts'
         *       'IAB_CONTENT_2_2':
         *           {values: ['48', '127']},
         *           // '48' = 'Books and Literature | Fiction'
         *           // '127' = 'Careers | Job Search'
         *     }
         *   }
         * });
         *
         * @see [About publisher provided signals (Beta)](https://support.google.com/admanager/answer/12451124)
         * @see [IAB Audience Taxonomy 1.1](https://iabtechlab.com/standards/audience-taxonomy/)
         * @see [IAB Content Taxonomy 2.2](https://iabtechlab.com/standards/content-taxonomy/)
         */
        interface PublisherProvidedSignalsConfig {
            /**
             * An object containing {@link googletag.config.Taxonomy | Taxonomy} mappings or null to clear the config.
             */
            taxonomies: Partial<Record<Taxonomy, TaxonomyData>> | null;
        }

        /**
         * An object containing the values for a single
         * {@link googletag.config.Taxonomy | Taxonomy}.
         */
        interface TaxonomyData {
            /**
             * A list of {@link googletag.config.Taxonomy | Taxonomy} values.
             */
            values: readonly string[];
        }

        /**
         * Supported taxonomies for
         * {@link googletag.config.PublisherProvidedSignalsConfig | publisher provided signals (PPS)}.
         *
         * @see [IAB Audience Taxonomy 1.1](https://iabtechlab.com/standards/audience-taxonomy/)
         * @see [IAB Content Taxonomy 2.2](https://iabtechlab.com/standards/content-taxonomy/)
         */
        type Taxonomy = "IAB_AUDIENCE_1_1" | "IAB_CONTENT_2_2";

        /**
         * Settings to control [SafeFrame](https://support.google.com/admanager/answer/6023110)
         * in GPT.
         *
         * @see {@link googletag.config.PageSettingsConfig.safeFrame | PageSettingsConfig.safeFrame}
         * @see {@link googletag.config.SlotSettingsConfig.safeFrame | SlotSettingsConfig.safeFrame}
         */
        interface SafeFrameConfig {
            /**
             * Whether ad(s) should be forced to be rendered using a SafeFrame container.
             */
            forceSafeFrame?: boolean | null;

            /**
             * Whether SafeFrame should allow ad content to expand by overlaying page
             * content.
             */
            allowOverlayExpansion?: boolean | null;

            /**
             * Whether SafeFrame should allow ad content to expand by pushing page
             * content.
             */
            allowPushExpansion?: boolean | null;

            /**
             * Whether SafeFrame should use the HTML5 sandbox attribute to prevent top
             * level navigation without user interaction. The only valid value is
             * `true` (cannot be forced to `false`). Note that the
             * sandbox attribute disables plugins (e.g. Flash).
             */
            sandbox?: boolean | null;

            /**
             * Whether SafeFrame should use randomized subdomains for
             * Reservation creatives. Pass in `null` to clear the stored
             * value.
             *
             * Note: this feature is enabled by default.
             *
             * @deprecated It is no longer possible to disable this feature. Setting
             * `useUniqueDomain` has no effect.
             * @see [Render creatives using SafeFrame](https://support.google.com/admanager/answer/9999596)
             */
            useUniqueDomain?: boolean | null;
        }

        /**
         * Main configuration interface for slot-level settings.
         *
         * Allows setting multiple features with a single API call for a single slot.
         *
         * All properties listed below are examples and do not reflect actual features
         * that utilize setConfig.  For the set of features, see fields within the
         * SlotSettingsConfig type below.
         *
         * Examples:
         * - Only features specified in the {@link Slot.setConfig} call are
         *   modified.
         *   ```
         *   const slot = googletag.defineSlot("/1234567/example", [160, 600]);
         *
         *   // Configure feature alpha.
         *   slot.setConfig({
         *       alpha: {...}
         *   });
         *
         *   // Configure feature bravo. Feature alpha is unchanged.
         *   slot.setConfig({
         *      bravo: {...}
         *   });
         *   ```
         * - All settings for a given feature are updated with each call to
         *   {@link Slot.setConfig}.
         *   ```
         *   // Configure feature charlie to echo = 1, foxtrot = true.
         *   slot.setConfig({
         *       charlie: {
         *           echo: 1,
         *           foxtrot: true,
         *       }
         *   });
         *
         *   // Update feature charlie to echo = 2. Since foxtrot was not specified,
         *   // the value is cleared.
         *   slot.setConfig({
         *       charlie: {
         *           echo: 2
         *       }
         *   });
         *   ```
         * - All settings for a feature can be cleared by passing `null`.
         *   ```
         *   // Configure features delta, golf, and hotel.
         *   slot.setConfig({
         *       delta: {...},
         *       golf: {...},
         *       hotel: {...},
         *   });
         *
         *   // Feature delta and hotel are cleared, but feature golf remains set.
         *   slot.setConfig({
         *       delta: null,
         *       hotel: null,
         *   });
         *   ```
         */
        interface SlotSettingsConfig {
            /**
             * An array of component auctions to be included in an on-device ad auction.
             */
            componentAuction?: ComponentAuctionConfig[] | null;

            /**
             * Settings that configure interstitial ad slot behavior.
             *
             * @see [Traffic web interstitials](https://support.google.com/admanager/answer/9840201)
             */
            interstitial?: InterstitialConfig | null;

            /**
             * Settings to configure ad expansion.
             *
             * @see [Ad expansion](https://support.google.com/admanager/answer/9117822)
             */
            adExpansion?: AdExpansionConfig | null;

            /**
             * Setting to configure the URL to which users will be redirected after
             * clicking on the ad.
             *
             * The Google Ad Manager servers still record a click even if the
             * click URL is replaced. Any landing page URL associated with the creative
             * that is served is appended to the provided value. Setting this value more
             * than once will overwrite any previously configured value. Passing in `null`
             * will clear the value.
             *
             * **Note:** This setting only applies to
             * {@link config.PageSettingsConfig.singleRequest | non-SRA requests}.
             *
             * @example
             *   const slot = googletag.defineSlot('/1234567/sports', [160, 600], 'div')!
             *                         .addService(googletag.pubads());
             *
             *   // Sets the click URL to 'http://www.example.com?original_click_url='.
             *   slot.setConfig({
             *     clickUrl: 'http://www.example.com?original_click_url=',
             *   });
             *
             *   // Clears the click URL.
             *   slot.setConfig({
             *     clickUrl: null,
             *   });
             */
            clickUrl?: string | null;

            /**
             * Settings to configure the use of
             * [SafeFrame](https://support.google.com/admanager/answer/6023110)
             * in GPT.
             *
             * Values configured via this setting will only apply to the ad slot, and
             * override values set via
             * {@link googletag.config.PageSettingsConfig.safeFrame | PageSettingsConfig.safeFrame}.
             *
             * @example
             *   const slot = googletag.defineSlot('/1234567/sports', [160, 600], 'div')!
             *                         .addService(googletag.pubads());
             *
             *   // Force SafeFrame for the slot.
             *   slot.setConfig({
             *     safeFrame: {forceSafeFrame: true}
             *   });
             *
             *   // Configure SafeFrame to allow overlay expansion for the slot.
             *   slot.setConfig({
             *     safeFrame: {allowOverlayExpansion: true}
             *   });
             *
             *   // Clear forceSafeFrame setting for the slot.
             *   slot.setConfig({
             *     safeFrame: {forceSafeFrame: null}
             *   });
             *
             *   // Clear all SafeFrame settings for the slot.
             *   slot.setConfig({safeFrame: null});
             */
            safeFrame?: SafeFrameConfig | null;

            /**
             * Setting to configure the collapsing behavior of the ad slot.
             *
             * A collapsed ad slot does not take up any space on the page.
             *
             * Supported values:
             *  - `null` (default): The slot will not be collapsed.
             *  - `DISABLED`: The slot will not collapse, whether or not an ad is
             *    returned.
             *  - `BEFORE_FETCH`: The slot will start out collapsed, and expand when
             *    an ad is returned.
             *  - `ON_NO_FILL`: The slot will start out expanded, and collapse if no ad
             *    is returned.
             *
             * @example
             *   const slot = googletag.defineSlot('/1234567/sports', [160, 600], 'div')!
             *            .addService(googletag.pubads());
             *
             *   // Collapse the div for this slot if no ad is returned.
             *   slot.setConfig({
             *     collapseDiv: 'ON_NO_FILL',
             *   });
             *
             *   // Collapse the div for this slot by default, and expand only
             *   // if an ad is returned.
             *   slot.setConfig({
             *     collapseDiv: 'BEFORE_FETCH',
             *   });
             *
             *   // Do not collapse the div for this slot.
             *   slot.setConfig({
             *     collapseDiv: 'DISABLED',
             *   });
             *
             *   // Clear the collapse setting.
             *   slot.setConfig({
             *     collapseDiv: null,
             *   });
             *
             * @see [Collapse empty ad slots](https://developers.google.com/publisher-tag/samples/collapse-empty-ad-slots)
             * @see [Minimize layout shift](https://developers.google.com/publisher-tag/guides/minimize-layout-shift)
             */
            collapseDiv?: "DISABLED" | "BEFORE_FETCH" | "ON_NO_FILL" | null;

            /**
             * Setting to configure ad category exclusions.
             *
             * @example
             *   const slot = googletag.defineSlot('/1234567/sports', [160, 600], 'div')!
             *            .addService(googletag.pubads());
             *
             *   // Label = AirlineAd
             *   slot.setConfig({
             *     categoryExclusion: ['AirlineAd'],
             *   });
             *
             *   // Clearing category exclusion setting.
             *   slot.setConfig({categoryExclusion: null});
             *
             * @see [Custom labels to block ads](https://support.google.com/admanager/answer/3238504)
             */
            categoryExclusion?: string[] | null;

            /**
             * Setting to configure key-value targeting.
             *
             * Targeting configured via this setting will only apply to the ad slot.
             * This setting may be called multiple times to define multiple targeting
             * key-values, or overwrite existing values.
             * Targeting keys are defined in your Google Ad Manager account.
             *
             * @example
             *   const slot = googletag.defineSlot('/1234567/sports', [160, 600], 'div')!
             *            .addService(googletag.pubads());
             *
             *   // Setting a single targeting key-value.
             *   slot.setConfig({targeting: {interests: 'sports'}});
             *
             *   // Setting multiple values for a single targeting key.
             *   slot.setConfig({targeting: {interests: ['sports', 'music']}});
             *
             *   // Setting multiple targeting key-values at once.
             *   slot.setConfig({targeting: {interests: ['sports', 'music'], color: 'red'}});
             *
             *   // Clearing a single targeting key.
             *   slot.setConfig({targeting: {interests: null}});
             *
             *   // Clear all targeting keys.
             *   slot.setConfig({targeting: null});
             *
             * @see [Key-value targeting](https://developers.google.com/publisher-tag/guides/key-value-targeting)
             */
            targeting?: Record<string, string | string[] | null> | null;

            /**
             * Setting to configure AdSense attributes.
             *
             * AdSense attributes configured via this setting will only apply to the
             * ad slot. This setting may be called multiple times to define multiple
             * attribute values, or overwrite existing values.
             *
             * AdSense attribute changes only apply to ads requested after this method
             * has been called. For that reason, it is recommended to call this method before
             * any calls to {@link googletag.display} or {@link PubAdsService.refresh}.
             *
             * @example
             *   const slot = googletag.defineSlot('/1234567/sports', [160, 600], 'div')!
             *            .addService(googletag.pubads());
             *
             *   // Set the AdSense ad format and channel IDs.
             *   slot.setConfig({adsenseAttributes: {adsense_ad_format: '120x240_as', adsense_channel_ids: '271828183+314159265'}});
             *
             *   // Clear the AdSense channel IDs only.
             *   slot.setConfig({adsenseAttributes: {adsense_channel_ids: null}});
             *
             *   // Clear all AdSense attributes.
             *   slot.setConfig({adsenseAttributes: null});
             */
            adsenseAttributes?: AdSenseAttributesConfig | null;
        }

        /**
         * An object representing a single component auction in a on-device ad auction.
         *
         * @see [Protected Audience API Seller guide: run ad auctions](https://developer.chrome.com/docs/privacy-sandbox/fledge-api/ad-auction/)
         */
        interface ComponentAuctionConfig {
            /**
             * The configuration key associated with this component auction.
             *
             * This value must be non-empty and should be unique. If two
             * `ComponentAuctionConfig` objects share the same configKey value,
             * the last to be set will overwrite prior configurations.
             */
            configKey: string;

            /**
             * An auction configuration object for this component auction.
             *
             * If this value is set to `null`, any existing configuration for
             * the specified `configKey` will be deleted.
             *
             * @example
             *
             * const componentAuctionConfig = {
             *   // Seller URL should be https and the same as decisionLogicURL's origin
             *   seller: 'https://testSeller.com',
             *   decisionLogicURL: 'https://testSeller.com/ssp/decision-logic.js',
             *   interestGroupBuyers: [
             *     'https://example-buyer.com',
             *   ],
             *   auctionSignals: {auction_signals: 'auction_signals'},
             *   sellerSignals: {seller_signals: 'seller_signals'},
             *   perBuyerSignals: {
             *     // listed on interestGroupBuyers
             *     'https://example-buyer.com': {
             *       per_buyer_signals: 'per_buyer_signals',
             *     },
             *   },
             * };
             *
             * const auctionSlot = googletag.defineSlot('/1234567/example', [160, 600])!;
             *
             * // To add configKey to the component auction:
             * auctionSlot.setConfig({
             *   componentAuction: [{
             *      configKey: 'https://testSeller.com',
             *      auctionConfig: componentAuctionConfig
             *   }]
             * });
             *
             * // To remove configKey from the component auction:
             * auctionSlot.setConfig({
             *   componentAuction: [{
             *      configKey: 'https://testSeller.com',
             *      auctionConfig: null
             *   }]
             * });
             *
             * @see [Protected Audience API: Initiating an On-Device Auction](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#21-initiating-an-on-device-auction)
             */
            auctionConfig: {
                seller: string;
                decisionLogicURL: string;
                trustedScoringSignalsURL?: string;
                interestGroupBuyers?: string[];
                auctionSignals?: unknown;
                sellerSignals?: unknown;
                sellerTimeout?: number;
                sellerExperimentGroupId?: number;
                perBuyerSignals?: { [buyer: string]: unknown };
                perBuyerTimeouts?: { [buyer: string]: number };
                perBuyerGroupLimits?: { [buyer: string]: number };
                perBuyerExperimentGroupIds?: { [buyer: string]: number };
            } | null;
        }

        /**
         * An object which defines the behavior of a single interstitial ad slot.
         */
        interface InterstitialConfig {
            /**
             * The interstitial trigger configuration for this interstitial ad.
             *
             * Setting the value of an interstitial trigger to `true` will enable it and
             * `false` will disable it. This will override the default values [configured
             * in Google Ad Manager](https://support.google.com/admanager/answer/9840201).
             *
             * @example
             *  // Define a GPT managed web interstitial ad slot.
             *  const interstitialSlot = googletag.defineOutOfPageSlot(
             *      "/1234567/sports",
             *      googletag.enums.OutOfPageFormat.INTERSTITIAL)!;
             *
             *  // Enable optional interstitial triggers.
             *  // Change this value to false to disable.
             *  const enableTriggers = true;
             *
             *  interstitialSlot.setConfig({
             *    interstitial: {
             *      triggers: {
             *        navBar: enableTriggers,
             *        unhideWindow: enableTriggers
             *      }
             *    }
             *  });
             *
             * @see [Display a web interstitial ad](https://developers.google.com/publisher-tag/samples/display-web-interstitial-ad)
             */
            triggers?: Partial<Record<InterstitialTrigger, boolean>> | null;

            /**
             * Whether local storage consent is required to display this interstitial ad.
             *
             * GPT uses local storage to enforce a [frequency
             * cap](https://support.google.com/admanager/answer/9840201#frequency) for
             * interstitial ads. However, users who have not provided local storage
             * consent are still eligible to be served interstitial ads. Setting this
             * property to `true` opts out of the default behavior, and ensures
             * interstial ads are only shown to users who have provided local storage
             * consent.
             *
             * @example
             *  // Opt out of showing interstitials to users
             *  // without local storage consent.
             *  const interstitialSlot = googletag.defineOutOfPageSlot(
             *      "/1234567/sports",
             *      googletag.enums.OutOfPageFormat.INTERSTITIAL)!;
             *
             *  interstitialSlot.setConfig({
             *    interstitial: {
             *      requireStorageAccess: true, // defaults to false
             *    }
             *  });
             *
             * @see [Traffic web interstitials](https://support.google.com/admanager/answer/9840201)
             */
            requireStorageAccess?: boolean | null;
        }

        /**
         * Supported interstitial ad triggers.
         */
        type InterstitialTrigger = "unhideWindow" | "navBar";

        /**
         * Settings to configure video ad related settings.
         *
         * @see {@link googletag.config.PageSettingsConfig.videoAds | PageSettingsConfig.videoAds}
         */
        interface VideoAdsConfig {
            /**
             * Whether videos ads will be present on the page.
             *
             * When set to `true`, this enables content exclusion constraints on
             * display and video ads.
             *
             * If the video content is known, set
             * {@link videoContentId} and {@link videoCmsId} to the values provided to the
             * Google Ad Manager content ingestion service to utilize content exclusion
             * for display ads.
             */
            enableVideoAds: boolean | null;

            /**
             * The video content ID.
             *
             * This is a unique value that identifies a particular video from the
             * content source specified by {@link videoCmsId}. This value is assigned by
             * the CMS that hosts your video content.
             *
             * @see [vid (Video ID)](https://support.google.com/admanager/answer/10678356#vid&zippy=%2Cvid-video-id)
             */
            videoContentId?: string | null;

            /**
             * The video content source ID.
             *
             * This is a unique value assigned by the Google Ad Manager content
             * ingestion service to identify the source of video content specified by
             * {@link videoContentId}.
             *
             * @see [cmsid (Content Source ID)](https://support.google.com/admanager/answer/10678356#cmsid-vid&zippy=%2Ccmsid-content-source-id)
             */
            videoCmsId?: string | null;
        }
    }

    /**
     * This is the namespace that GPT uses for enum types.
     */
    namespace enums {
        /**
         * Out-of-page formats supported by GPT.
         *
         * @see {@link defineOutOfPageSlot}
         */
        enum OutOfPageFormat {
            /** Anchor format where slot sticks to the top of the viewport. */
            TOP_ANCHOR,
            /** Anchor format where slot sticks to the bottom of the viewport. */
            BOTTOM_ANCHOR,
            /** Web interstitial creative format. */
            INTERSTITIAL,
            /** Rewarded format. */
            REWARDED,
            /** Left side rail format. */
            LEFT_SIDE_RAIL,
            /** Right side rail format. */
            RIGHT_SIDE_RAIL,
            /**
             * Game manual interstitial format.
             *
             * **Note:** Game manual interstitial is a [limited-access](https://support.google.com/admanager/answer/14640119) format.
             */
            GAME_MANUAL_INTERSTITIAL,
            /** Ad Intents format. */
            AD_INTENTS,
        }

        /**
         * [Traffic sources](https://support.google.com/admanager/answer/11233407)
         * supported by GPT.
         *
         * @see {@link PrivacySettingsConfig.trafficSource}
         */
        enum TrafficSource {
            /**
             * Traffic redirected from properties other than owned (acquired or otherwise
             * incentivized activity).
             */
            PURCHASED,
            /** Direct URL entry, site search, or app download. */
            ORGANIC,
        }
    }

    /**
     * This is the namespace that GPT uses for managing secure signals.
     */
    namespace secureSignals {
        /**
         * Returns a secure signal for a specific bidder.
         *
         * A bidder secure signal provider consists of 2 parts:
         *
         * 1. A collector function, which returns a `Promise` that resolves to a secure
         * signal.
         * 2. An `id` which identifies the bidder associated with the signal.
         *
         * To return a secure signal for a publisher, use {@link
         * secureSignals.PublisherSignalProvider} instead.
         *
         * @example
         *   // id is provided
         *   googletag.secureSignalProviders!.push({
         *     id: 'collector123',
         *     collectorFunction: () => {
         *       // ...custom signal generation logic...
         *       return Promise.resolve('signal');
         *     }
         *   });
         * @see [Share secure signals with bidders](https://support.google.com/admanager/answer/10488752)
         */
        interface BidderSignalProvider {
            /**
             * A unique identifier for the collector associated with this secure signal,
             * as registered in Google Ad Manager.
             */
            id: string;

            /**
             * A function which returns a `Promise` that resolves to a secure signal.
             * @return A
             * [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
             * that resolves to a secure signal.
             */
            collectorFunction: () => Promise<string>;
        }

        /**
         * Returns a secure signal for a specific publisher.
         *
         * A publisher signal provider consists of 2 parts:
         *
         * 1. A collector function, which returns a `Promise` that resolves to a secure
         * signal.
         * 2. A `networkCode` which identifies the publisher associated with the signal.
         *
         * To return a secure signal for a bidder, use {@link
         * secureSignals.BidderSignalProvider} instead.
         *
         * @example
         *   // networkCode is provided
         *   googletag.secureSignalProviders!.push({
         *     networkCode: '123456',
         *     collectorFunction: () => {
         *       // ...custom signal generation logic...
         *       return Promise.resolve('signal');
         *     }
         *   });
         * @see [Share secure signals with bidders](https://support.google.com/admanager/answer/10488752)
         */
        interface PublisherSignalProvider {
            /**
             * The network code (as seen in the ad unit path) for the publisher associated
             * with this secure signal.
             */
            networkCode: string;

            /**
             * A function which returns a `Promise` that resolves to a secure signal.
             * @return A
             * [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
             * that resolves to a secure signal.
             */
            collectorFunction: () => Promise<string>;
        }

        /**
         * Interface for returning a secure signal for a specific bidder or provider.
         * One of `id` or `networkCode` must be provided, but not both.
         */
        type SecureSignalProvider = BidderSignalProvider | PublisherSignalProvider;

        /**
         * An interface for managing secure signals.
         */
        interface SecureSignalProvidersArray {
            /**
             * Adds a new {@link secureSignals.SecureSignalProvider} to the signal
             * provider array and begins the signal generation process.
             * @param provider The {@link secureSignals.SecureSignalProvider} object to be
             * added to the array.
             */
            push(provider: SecureSignalProvider): void;

            /**
             * Clears all signals for all collectors from cache.
             *
             * Calling this method may reduce the likelihood of signals being included
             * in ad requests for the current and potentially later page views. Due to
             * this, it should only be called when meaningful state changes occur,
             * such as events that indicate a new user (log in, log out, sign up, etc.).
             */
            clearAllCache(): void;
        }
    }

    /**
     * This is the namespace that GPT uses for Events. Your code can react to these
     * events using Service.addEventListener.
     */
    namespace events {
        /**
         * Base Interface for all GPT events. All GPT events below will have the
         * following fields.
         *
         * @see [Ad event listeners](https://developers.google.com/publisher-tag/samples/ad-event-listeners)
         */
        interface Event {
            /** The slot that triggered the event. */
            slot: Slot;

            /** Name of the service that triggered the event. */
            serviceName: string;
        }

        /**
         * This event is fired when an ad has been requested for a particular slot.
         *
         * @example
         *   // This listener is called when the specified service issues an ad
         *   // request for a slot. Each slot will fire this event, even though they
         *   // may be batched together in a single request if single request
         *   // architecture (SRA) is enabled.
         *   const targetSlot = googletag.defineSlot('/1234567/example', [160, 600]);
         *   googletag.pubads().addEventListener('slotRequested', (event) => {
         *     const slot = event.slot;
         *     console.log('Slot', slot.getSlotElementId(), 'has been requested.');
         *
         *     if (slot === targetSlot) {
         *       // Slot specific logic.
         *     }
         *   });
         *
         * @see [Ad event listeners](https://developers.google.com/publisher-tag/samples/ad-event-listeners)
         */
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface SlotRequestedEvent extends Event {}

        /**
         * This event is fired when the creative code is injected into a slot. This
         * event will occur before the creative's resources are fetched, so the
         * creative may not be visible yet. If you need to know when all creative
         * resources for a slot have finished loading, consider the
         * {@link events.SlotOnloadEvent} instead.
         *
         * @example
         *   // This listener is called when a slot has finished rendering.
         *   const targetSlot = googletag.defineSlot('/1234567/example', [160, 600]);
         *   googletag.pubads().addEventListener('slotRenderEnded',
         *       (event) => {
         *         const slot = event.slot;
         *         console.group(
         *             'Slot', slot.getSlotElementId(), 'finished rendering.');
         *
         *         // Log details of the rendered ad.
         *         console.log('Advertiser ID:', event.advertiserId);
         *         console.log('Campaign ID:', event.campaignId);
         *         console.log('Company IDs:', event.companyIds);
         *         console.log('Creative ID:', event.creativeId);
         *         console.log('Creative Template ID:', event.creativeTemplateId);
         *         console.log('Is backfill?:', event.isBackfill);
         *         console.log('Is empty?:', event.isEmpty);
         *         console.log('Line Item ID:', event.lineItemId);
         *         console.log('Size:', event.size);
         *         console.log('Slot content changed?', event.slotContentChanged);
         *         console.log('Source Agnostic Creative ID:',
         *                     event.sourceAgnosticCreativeId);
         *         console.log('Source Agnostic Line Item ID:',
         *                     event.sourceAgnosticLineItemId);
         *         console.log('Yield Group IDs:', event.yieldGroupIds);
         *         console.groupEnd();
         *
         *         if (slot === targetSlot) {
         *           // Slot specific logic.
         *         }
         *       }
         *   );
         *
         * @see [Ad event listeners](https://developers.google.com/publisher-tag/samples/ad-event-listeners)
         */
        interface SlotRenderEndedEvent extends Event {
            /**
             * Whether an ad was returned for the slot. Value is `true` if
             * no ad was returned, `false` otherwise.
             */
            isEmpty: boolean;
            /**
             * Whether the slot content was changed with the rendered ad. Value is
             * `true` if the content was changed, `false` otherwise.
             */
            slotContentChanged: boolean;
            /**
             * Indicates the pixel size of the rendered creative. Example:
             * `[728, 90]`. Value is `null` for empty ad slots.
             */
            size: number[] | string | null;
            /**
             * Advertiser ID of the rendered ad. Value is `null` for empty
             * slots, backfill ads, and creatives rendered by services other than
             * {@link PubAdsService}.
             */
            advertiserId: number | null;
            /**
             * Campaign ID of the rendered ad. Value is `null` for empty
             * slots, backfill ads, and creatives rendered by services other than
             * {@link PubAdsService}.
             */
            campaignId: number | null;
            /**
             * Creative ID of the rendered reservation ad. Value is `null`
             * for empty slots, backfill ads, and creatives rendered by services other
             * than {@link PubAdsService}.
             */
            creativeId: number | null;
            /**
             * Creative template ID of the rendered reservation ad. Value is
             * `null` for empty slots, backfill ads, and creatives rendered by
             * services other than {@link PubAdsService}.
             */
            creativeTemplateId: number | null;
            /**
             * @deprecated This field is no longer populated.
             */
            labelIds: number[] | null;
            /**
             * Line item ID of the rendered reservation ad. Value is `null`
             * for empty slots, backfill ads, and creatives rendered by services other
             * than {@link PubAdsService}.
             */
            lineItemId: number | null;
            /**
             * Creative ID of the rendered reservation or backfill ad. Value is
             * `null` if the ad is not a reservation or line item backfill,
             * or the creative is rendered by services other than
             * {@link PubAdsService}.
             */
            sourceAgnosticCreativeId: number | null;
            /**
             * Line item ID of the rendered reservation or backfill ad. Value is
             * `null` if the ad is not a reservation or line item backfill,
             * or the creative is rendered by services other than
             * {@link PubAdsService}.
             */
            sourceAgnosticLineItemId: number | null;
            /**
             * Whether an ad was a backfill ad. Value is `true` if
             * the ad was a backfill ad, `false` otherwise.
             */
            isBackfill: boolean;
            /**
             * IDs of the yield groups for the rendered backfill ad. Value is
             * `null` for empty slots, reservation ads, and creatives rendered by
             * services other than {@link PubAdsService}.
             */
            yieldGroupIds: number[] | null;
            /**
             * IDs of the companies that bid on the rendered backfill ad. Value is
             * `null` for empty slots, reservation ads, and creatives rendered by
             * services other than {@link PubAdsService}.
             */
            companyIds: number[] | null;
            /**
             * The response identifier is a unique identifier for the ad response. This value can be used to
             * identify and block the ad in the [Ad Review Center (ARC)](https://support.google.com/admanager/answer/146769).
             */
            responseIdentifier: string | null;
        }

        /**
         * This event is fired when an impression becomes viewable, according to the
         * [Active View criteria](https://support.google.com/admanager/answer/4524488).
         *
         * @example
         *   // This listener is called when an impression becomes viewable.
         *   const targetSlot = googletag.defineSlot('/1234567/example', [160, 600]);
         *   googletag.pubads().addEventListener('impressionViewable',
         *       (event) => {
         *         const slot = event.slot;
         *         console.log('Impression for slot', slot.getSlotElementId(),
         *                     'became viewable.');
         *
         *         if (slot === targetSlot) {
         *           // Slot specific logic.
         *         }
         *       }
         *   );
         *
         * @see [Ad event listeners](https://developers.google.com/publisher-tag/samples/ad-event-listeners)
         */
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface ImpressionViewableEvent extends Event {}

        /**
         * This event is fired when the creative's iframe fires its load event. When
         * rendering rich media ads in sync rendering mode, no iframe is used so no
         * `SlotOnloadEvent` will be fired.
         *
         * @example
         *   // This listener is called when a creative iframe load event fires.
         *   const targetSlot = googletag.defineSlot('/1234567/example', [160, 600]);
         *   googletag.pubads().addEventListener('slotOnload', (event) => {
         *     const slot = event.slot;
         *     console.log('Creative iframe for slot', slot.getSlotElementId(),
         *                 'has loaded.');
         *
         *     if (slot === targetSlot) {
         *       // Slot specific logic.
         *     }
         *   });
         *
         * @see [Ad event listeners](https://developers.google.com/publisher-tag/samples/ad-event-listeners)
         */
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface SlotOnloadEvent extends Event {}

        /**
         * This event is fired whenever the on-screen percentage of an ad slot's
         * area changes. The event is throttled and will not fire more often than
         * once every 200ms.
         *
         * @example
         *   // This listener is called whenever the on-screen percentage of an
         *   // ad slot's area changes.
         *   const targetSlot = googletag.defineSlot('/1234567/example', [160, 600]);
         *   googletag.pubads().addEventListener('slotVisibilityChanged',
         *       (event) => {
         *         const slot = event.slot;
         *         console.group(
         *             'Visibility of slot', slot.getSlotElementId(), 'changed.');
         *
         *         // Log details of the event.
         *         console.log('Visible area:', `${event.inViewPercentage}%`);
         *         console.groupEnd();
         *
         *         if (slot === targetSlot) {
         *           // Slot specific logic.
         *         }
         *       }
         *   );
         *
         * @see [Ad event listeners](https://developers.google.com/publisher-tag/samples/ad-event-listeners)
         */
        interface SlotVisibilityChangedEvent extends Event {
            /**
             * The percentage of the ad's area that is visible. Value is a number
             * between 0 and 100.
             */
            inViewPercentage: number;
        }

        /**
         * This event is fired when an ad response has been received for a
         * particular slot.
         *
         * @example
         *   // This listener is called when an ad response has been received
         *   // for a slot.
         *   const targetSlot = googletag.defineSlot('/1234567/example', [160, 600]);
         *   googletag.pubads().addEventListener('slotResponseReceived',
         *       (event) => {
         *         const slot = event.slot;
         *         console.log('Ad response for slot', slot.getSlotElementId(),
         *                     'received.');
         *
         *         if (slot === targetSlot) {
         *           // Slot specific logic.
         *         }
         *       }
         *   );
         *
         * @see [Ad event listeners](https://developers.google.com/publisher-tag/samples/ad-event-listeners)
         */
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface SlotResponseReceived extends Event {}

        /**
         * This event is fired when a reward is granted for viewing a
         * [rewarded ad](https://support.google.com/admanager/answer/9116812).
         * If the ad is closed before the criteria for granting a reward is met, this
         * event will not fire.
         * @example
         *   const targetSlot = googletag.defineOutOfPageSlot(
         *       '/1234567/example',
         *       googletag.enums.OutOfPageFormat.REWARDED);
         *
         *   // Slot returns null if the page or device does not support rewarded ads.
         *   if(targetSlot) {
         *     targetSlot.addService(googletag.pubads());
         *
         *     // This listener is called whenever a reward is granted for a
         *     // rewarded ad.
         *     googletag.pubads().addEventListener('rewardedSlotGranted',
         *         (event) => {
         *           const slot = event.slot;
         *           console.group(
         *               'Reward granted for slot', slot.getSlotElementId(), '.');
         *
         *           // Log details of the reward.
         *           console.log('Reward type:', event.payload?.type);
         *           console.log('Reward amount:', event.payload?.amount);
         *           console.groupEnd();
         *
         *           if (slot === targetSlot) {
         *             // Slot specific logic.
         *           }
         *         }
         *     );
         *   }
         *
         * @see [Ad event listeners](https://developers.google.com/publisher-tag/samples/ad-event-listeners)
         * @see [Display a rewarded ad](https://developers.google.com/publisher-tag/samples/display-rewarded-ad)
         */
        interface RewardedSlotGrantedEvent extends Event {
            /** An object containing information about the reward that was granted. */
            payload: RewardedPayload | null;
        }

        /**
         * This event is fired when a rewarded ad slot is closed by the user. It may
         * fire either before or after a reward has been granted. To determine whether a
         * reward has been granted, use {@link events.RewardedSlotGrantedEvent}
         * instead.
         * @example
         *   const targetSlot = googletag.defineOutOfPageSlot(
         *       '/1234567/example',
         *       googletag.enums.OutOfPageFormat.REWARDED);
         *
         *   // Slot returns null if the page or device does not support rewarded ads.
         *   if(targetSlot) {
         *     targetSlot.addService(googletag.pubads());
         *
         *     // This listener is called when the user closes a rewarded ad slot.
         *     googletag.pubads().addEventListener('rewardedSlotClosed',
         *         (event) => {
         *           const slot = event.slot;
         *           console.log('Rewarded ad slot', slot.getSlotElementId(),
         *                       'has been closed.');
         *
         *           if (slot === targetSlot) {
         *             // Slot specific logic.
         *           }
         *         }
         *     );
         *   }
         *
         * @see [Ad event listeners](https://developers.google.com/publisher-tag/samples/ad-event-listeners)
         * @see [Display a rewarded ad](https://developers.google.com/publisher-tag/samples/display-rewarded-ad)
         */

        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface RewardedSlotClosedEvent extends Event {}

        /**
         * This event is fired when a
         * [rewarded ad](https://support.google.com/admanager/answer/9116812) is
         * ready to be displayed. The publisher is responsible for presenting the user
         * an option to view the ad before displaying it.
         * @example
         *   // This listener is called when a rewarded ad slot becomes ready to be
         *   // displayed.
         *   const targetSlot = googletag.defineOutOfPageSlot(
         *       '/1234567/example',
         *       googletag.enums.OutOfPageFormat.REWARDED);
         *
         *   // Slot returns null if the page or device does not support rewarded ads.
         *   if(targetSlot) {
         *     targetSlot.addService(googletag.pubads());
         *
         *     // This listener is called whenever a reward is granted for a
         *     // rewarded ad.
         *     googletag.pubads().addEventListener('rewardedSlotReady',
         *         (event) => {
         *            const slot = event.slot;
         *            console.log('Rewarded ad slot', slot.getSlotElementId(),
         *                        'is ready to be displayed.');
         *
         *            // Replace with custom logic.
         *            const userHasConsented = true;
         *           if(userHasConsented) {
         *             event.makeRewardedVisible();
         *           }
         *
         *           if (slot === targetSlot) {
         *             // Slot specific logic.
         *           }
         *         }
         *      );
         *   }
         *
         * @see [Ad event listeners](https://developers.google.com/publisher-tag/samples/ad-event-listeners)
         * @see [Display a rewarded ad](https://developers.google.com/publisher-tag/samples/display-rewarded-ad)
         */
        interface RewardedSlotReadyEvent extends Event {
            /**
             * Displays the rewarded ad. This method should not be called until the user
             * has consented to view the ad.
             */
            makeRewardedVisible(): void;
        }

        /**
         * This event is fired when a game manual interstitial slot is ready to be
         * shown to the user.
         *
         * **Note:** Game manual interstitial is a [limited-access](https://support.google.com/admanager/answer/14640119) format.
         *
         * @example
         *   // This listener is called when a game manual interstitial slot is ready to
         *   // be displayed.
         *   const targetSlot = googletag.defineOutOfPageSlot('/1234567/example', googletag.enums.OutOfPageFormat.GAME_MANUAL_INTERSTITIAL);
         *
         *   // Slot returns null if the page or device does not support game manual interstitial ads.
         *   if(targetSlot) {
         *     targetSlot.addService(googletag.pubads());
         *
         *     googletag.pubads().addEventListener('gameManualInterstitialSlotReady',
         *       (event) => {
         *         const slot = event.slot;
         *         console.log('Game manual interstital slot',
         *                     slot.getSlotElementId(), 'is ready to be displayed.')
         *
         *         // Replace with custom logic.
         *         const displayGmiAd = true;
         *         if (displayGmiAd) {
         *           event.makeGameManualInterstitialVisible();
         *         }
         *
         *         if (slot === targetSlot) {
         *           // Slot specific logic.
         *         }
         *       }
         *     );
         *   }
         *
         * @see [Ad event listeners](https://developers.google.com/publisher-tag/samples/ad-event-listeners)
         * @see [Display a game manual interstitial ad](https://support.google.com/admanager/answer/14640119)
         */
        interface GameManualInterstitialSlotReadyEvent extends Event {
            /** Displays the game manual interstitial ad to the user. */
            makeGameManualInterstitialVisible(): void;
        }

        /**
         * This event is fired when a game manual interstitial slot has been closed by
         * the user.
         *
         * **Note:** Game manual interstitial is a [limited-access](https://support.google.com/admanager/answer/14640119) format.
         *
         * @example
         *   // This listener is called when a game manual interstitial slot is closed.
         *   const targetSlot = googletag.defineOutOfPageSlot('/1234567/example', googletag.enums.OutOfPageFormat.GAME_MANUAL_INTERSTITIAL);
         *
         *   // Slot returns null if the page or device does not support game manual interstitial ads.
         *   if(targetSlot) {
         *     targetSlot.addService(googletag.pubads());
         *
         *     googletag.pubads().addEventListener('gameManualInterstitialSlotClosed',
         *       (event) => {
         *         const slot = event.slot;
         *         console.log('Game manual interstital slot',
         *                     slot.getSlotElementId(), 'is closed.')
         *
         *         if (slot === targetSlot) {
         *           // Slot specific logic.
         *         }
         *       }
         *     );
         *   }
         *
         * @see [Ad event listeners](https://developers.google.com/publisher-tag/samples/ad-event-listeners)
         * @see [Display a game manual interstitial ad](https://support.google.com/admanager/answer/14640119)
         */
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface GameManualInterstitialSlotClosedEvent extends Event {}

        /**
         * This is a pseudo-type that maps an event name to its corresponding event
         * object type for {@link Service.addEventListener} and
         * {@link Service.removeEventListener}. It is documented for reference and
         * type safety purposes only.
         */
        interface EventTypeMap {
            /**
             * Alias for {@link events.SlotRequestedEvent}.
             */
            slotRequested: SlotRequestedEvent;

            /**
             * Alias for {@link events.SlotRenderEndedEvent}.
             */
            slotRenderEnded: SlotRenderEndedEvent;

            /**
             * Alias for {@link events.ImpressionViewableEvent}.
             */
            impressionViewable: ImpressionViewableEvent;

            /**
             * Alias for {@link events.SlotOnloadEvent}.
             */
            slotOnload: SlotOnloadEvent;

            /**
             * Alias for {@link events.SlotVisibilityChangedEvent}.
             */
            slotVisibilityChanged: SlotVisibilityChangedEvent;

            /**
             * Alias for {@link events.SlotResponseReceived}.
             */
            slotResponseReceived: SlotResponseReceived;

            /**
             * Alias for {@link events.RewardedSlotGrantedEvent}.
             */
            rewardedSlotGranted: RewardedSlotGrantedEvent;

            /**
             * Alias for {@link events.RewardedSlotClosedEvent}.
             */
            rewardedSlotClosed: RewardedSlotClosedEvent;

            /**
             * Alias for {@link events.RewardedSlotReadyEvent}.
             */
            rewardedSlotReady: RewardedSlotReadyEvent;

            /**
             * Alias for {@link events.GameManualInterstitialSlotReadyEvent}.
             */
            gameManualInterstitialSlotReady: GameManualInterstitialSlotReadyEvent;

            /**
             * Alias for {@link events.GameManualInterstitialSlotClosedEvent}.
             */
            gameManualInterstitialSlotClosed: GameManualInterstitialSlotClosedEvent;
        }
    }
}
